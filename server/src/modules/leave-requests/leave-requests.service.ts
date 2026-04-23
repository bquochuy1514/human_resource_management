import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QueryLeaveRequestDto } from './dto/query-leave-request.dto';
import { LeaveStatus, UserRole } from 'generated/prisma/enums';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { differenceInCalendarDays } from 'date-fns';
import { RejectLeaveRequestDto } from './dto/reject-leave-request.dto';

@Injectable()
export class LeaveRequestsService {
  constructor(private prisma: PrismaService) {}

  async handleFindAll(query: QueryLeaveRequestDto, user: any) {
    const { page = 1, limit = 20, employeeId, type, status } = query;
    const skip = (page - 1) * limit;

    // EMPLOYEE chỉ xem được đơn của mình
    // ADMIN/HR xem được tất cả, có thể filter theo employeeId
    const where = {
      ...(user.role === UserRole.EMPLOYEE
        ? { employeeId: user.employeeId }
        : employeeId && { employeeId }),
      ...(type && { type }),
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.leaveRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { submittedAt: 'desc' },
        include: {
          employee: {
            omit: { salary: true },
            include: {
              user: { omit: { password: true, hashedRefreshToken: true } },
              department: true,
            },
          },
          reviewer: {
            omit: { salary: true },
            include: {
              user: { omit: { password: true, hashedRefreshToken: true } },
            },
          },
        },
      }),
      this.prisma.leaveRequest.count({ where }),
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

  async handleCreate(dto: CreateLeaveRequestDto, employeeId: number) {
    const { type, startDate, endDate, reason } = dto;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate endDate phải sau startDate
    if (end < start) {
      throw new BadRequestException('End date must be after start date');
    }

    // Tính totalDays
    const totalDays = differenceInCalendarDays(end, start) + 1;

    // Kiểm tra có đơn PENDING hoặc APPROVED nào trùng ngày không
    const overlap = await this.prisma.leaveRequest.findFirst({
      where: {
        employeeId,
        status: { in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
        OR: [{ startDate: { lte: end }, endDate: { gte: start } }],
      },
    });

    if (overlap) {
      throw new BadRequestException(
        'You already have a leave request overlapping this period',
      );
    }

    return this.prisma.leaveRequest.create({
      data: {
        employeeId,
        type,
        startDate: start,
        endDate: end,
        totalDays,
        reason,
      },
    });
  }

  async handleApprove(id: number, reviewerId: number) {
    console.log(reviewerId);
    const leaveRequest = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });

    if (!leaveRequest) {
      throw new NotFoundException(`Leave request #${id} not found`);
    }

    if (leaveRequest.status !== LeaveStatus.PENDING) {
      throw new BadRequestException(
        'Only pending leave requests can be approved',
      );
    }

    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: LeaveStatus.APPROVED,
        reviewerId,
        reviewedAt: new Date(),
      },
    });
  }

  async handleReject(
    id: number,
    reviewerId: number,
    dto: RejectLeaveRequestDto,
  ) {
    const leaveRequest = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });

    if (!leaveRequest) {
      throw new NotFoundException(`Leave request #${id} not found`);
    }

    if (leaveRequest.status !== LeaveStatus.PENDING) {
      throw new BadRequestException(
        'Only pending leave requests can be rejected',
      );
    }

    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: LeaveStatus.REJECTED,
        reviewerId,
        reviewNote: dto.reviewNote,
        reviewedAt: new Date(),
      },
    });
  }
}
