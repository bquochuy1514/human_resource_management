import { Module } from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { LeaveRequestsController } from './leave-requests.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LeaveRequestsController],
  providers: [LeaveRequestsService, PrismaService],
})
export class LeaveRequestsModule {}
