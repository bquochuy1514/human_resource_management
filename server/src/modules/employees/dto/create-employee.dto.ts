/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  IsDateString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsNumber()
  @IsPositive()
  departmentId: number;

  @IsDateString()
  hireDate: string;

  @IsNumber()
  @IsPositive()
  salary: number;
}
