// src/attendance/dto/query-attendance.dto.ts
import { IsOptional, IsInt, IsDateString, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CheckInStatus, CheckOutStatus } from 'generated/prisma/enums';

export class QueryAttendanceDto {
  // Pagination
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  // Filter theo nhân viên
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  employeeId?: number;

  // Filter theo ngày cụ thể: ?date=2025-06-15
  @IsOptional()
  @IsDateString()
  date?: string;

  // Filter theo tháng: ?month=2025-06
  @IsOptional()
  month?: string; // format: YYYY-MM

  @IsOptional()
  @IsEnum(CheckInStatus)
  checkInStatus?: CheckInStatus;

  @IsOptional()
  @IsEnum(CheckOutStatus)
  checkOutStatus?: CheckOutStatus;
}
