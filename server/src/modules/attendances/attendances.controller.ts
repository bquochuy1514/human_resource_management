import {
  Controller,
  Get,
  UseGuards,
  Query,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllAttendances(@Query() query: QueryAttendanceDto) {
    return this.attendancesService.handleFindAllAttendances(query);
  }

  @Post('check-in')
  @UseGuards(JwtAuthGuard)
  checkIn(@Req() req, @Body() dto: CheckInDto) {
    return this.attendancesService.handleCheckIn(req.user.employeeId, dto);
  }

  @Post('check-out')
  @UseGuards(JwtAuthGuard)
  checkout(@Req() req, @Body() dto: CheckOutDto) {
    return this.attendancesService.handleCheckOut(req.user.employeeId, dto);
  }
}
