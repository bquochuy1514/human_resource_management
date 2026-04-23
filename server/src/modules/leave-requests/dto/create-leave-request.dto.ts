// dto/create-leave-request.dto.ts
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LeaveType } from 'generated/prisma/enums';

export class CreateLeaveRequestDto {
  @IsEnum(LeaveType)
  type: LeaveType;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
