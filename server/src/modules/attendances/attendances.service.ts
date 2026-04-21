import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import {
  addMinutes,
  differenceInMinutes,
  endOfDay,
  endOfMonth,
  isAfter,
  isBefore,
  parse,
  setHours,
  setMinutes,
  startOfDay,
  startOfMonth,
  subMinutes,
} from 'date-fns';
import { CheckInDto } from './dto/check-in.dto';
import { CheckInStatus, CheckOutStatus } from 'generated/prisma/enums';
import { CheckOutDto } from './dto/check-out.dto';

@Injectable()
export class AttendancesService {
  constructor(private prisma: PrismaService) {}

  async handleFindAllAttendances(query: QueryAttendanceDto) {
    const {
      page,
      limit,
      employeeId,
      date,
      month,
      checkInStatus,
      checkOutStatus,
    } = query;
    const skip = (page - 1) * limit;

    let dateFilter = {};

    if (date) {
      const parsed = new Date(date);
      dateFilter = {
        date: { gte: startOfDay(parsed), lte: endOfDay(parsed) },
      };
    } else if (month) {
      const parsed = parse(month, 'yyyy-MM', new Date());
      dateFilter = {
        date: { gte: startOfMonth(parsed), lte: endOfMonth(parsed) },
      };
    }

    const where = {
      ...(employeeId && { employeeId }),
      ...(checkInStatus && { checkInStatus }),
      ...(checkOutStatus && { checkOutStatus }),
      ...dateFilter,
    };

    const [data, total] = await Promise.all([
      this.prisma.attendance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          employee: {
            omit: { salary: true },
            include: {
              user: { omit: { hashedRefreshToken: true, password: true } },
              department: true,
            },
          },
        },
      }),
      this.prisma.attendance.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async handleCheckIn(employeeId: number, dto: CheckInDto) {
    const now = dto.overrideTime ? new Date(dto.overrideTime) : new Date();
    const localDate = now.toLocaleDateString('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    const today = new Date(`${localDate}T00:00:00.000Z`);

    const existing = await this.prisma.attendance.findUnique({
      where: { employeeId_date: { employeeId, date: today } },
    });

    if (existing) {
      throw new BadRequestException('You have already checked in today.');
    }

    const WORK_START_HOUR = parseInt(process.env.WORK_START_HOUR) || 8;
    const BUFFER_MINUTES =
      parseInt(process.env.WORK_START_BUFFER_MINUTES) || 15;

    const workStart = setMinutes(setHours(now, WORK_START_HOUR), 0);
    const lateThreshold = addMinutes(workStart, BUFFER_MINUTES);

    const checkInStatus = isBefore(now, lateThreshold)
      ? CheckInStatus.ON_TIME
      : CheckInStatus.LATE;

    return this.prisma.attendance.create({
      data: {
        employeeId,
        date: today,
        checkIn: now,
        checkInStatus,
      },
    });
  }

  async handleCheckOut(employeeId: number, dto: CheckOutDto) {
    const now = dto.overrideTime ? new Date(dto.overrideTime) : new Date();
    const localDate = now.toLocaleDateString('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    const today = new Date(`${localDate}T00:00:00.000Z`);

    const attendance = await this.prisma.attendance.findUnique({
      where: { employeeId_date: { employeeId, date: today } },
    });

    if (!attendance) {
      throw new BadRequestException('You have not checked in today.');
    }

    if (attendance.checkOut) {
      throw new BadRequestException('You have already checked out today.');
    }

    const workingHours = differenceInMinutes(now, attendance.checkIn) / 60;

    const WORK_END_HOUR = parseInt(process.env.WORK_END_HOUR) || 17;
    const BUFFER_MINUTES = parseInt(process.env.WORK_END_BUFFER_MINUTES) || 15;

    const workEnd = setMinutes(setHours(now, WORK_END_HOUR), 0);
    const earlyLeaveThreshold = subMinutes(workEnd, BUFFER_MINUTES); // 16:45
    const overtimeThreshold = addMinutes(workEnd, BUFFER_MINUTES); // 17:15

    let checkOutStatus: CheckOutStatus;
    if (isAfter(now, overtimeThreshold)) {
      checkOutStatus = CheckOutStatus.OVERTIME;
    } else if (isBefore(now, earlyLeaveThreshold)) {
      checkOutStatus = CheckOutStatus.EARLY_LEAVE;
    } else {
      checkOutStatus = CheckOutStatus.ON_TIME;
    }

    return this.prisma.attendance.update({
      where: { employeeId_date: { employeeId, date: today } },
      data: {
        checkOut: now,
        workingHours: parseFloat(workingHours.toFixed(2)),
        checkOutStatus,
      },
    });
  }
}
