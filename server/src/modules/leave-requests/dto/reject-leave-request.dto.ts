// dto/reject-leave-request.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class RejectLeaveRequestDto {
  @IsString()
  @IsNotEmpty()
  reviewNote: string;
}
