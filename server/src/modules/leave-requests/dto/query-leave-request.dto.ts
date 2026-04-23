// dto/query-leave-request.dto.ts
import { IsOptional, IsInt, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { LeaveType, LeaveStatus } from 'generated/prisma/enums';

export class QueryLeaveRequestDto {
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

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  employeeId?: number;

  @IsOptional()
  @IsEnum(LeaveType)
  type?: LeaveType;

  @IsOptional()
  @IsEnum(LeaveStatus)
  status?: LeaveStatus;
}
