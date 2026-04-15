import { EmployeeStatus } from 'generated/prisma/enums';
import { IsEnum, IsOptional, IsString, IsInt, IsNumber } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsInt()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
