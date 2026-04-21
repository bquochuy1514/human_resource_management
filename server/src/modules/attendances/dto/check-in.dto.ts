// src/attendances/dto/check-in.dto.ts
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CheckInDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsDateString()
  overrideTime?: string; // chỉ dùng khi dev/test: "2025-06-15T07:30:00"
}
