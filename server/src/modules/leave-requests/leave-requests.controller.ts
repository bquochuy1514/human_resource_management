import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from 'generated/prisma/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { QueryLeaveRequestDto } from './dto/query-leave-request.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { LeaveRequestsService } from './leave-requests.service';
import { RejectLeaveRequestDto } from './dto/reject-leave-request.dto';

@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(@Query() query: QueryLeaveRequestDto, @Req() req) {
    return this.leaveRequestsService.handleFindAll(query, req.user);
  }

  @Post()
  @Roles(UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateLeaveRequestDto, @Req() req) {
    return this.leaveRequestsService.handleCreate(dto, req.user.employeeId);
  }

  @Put(':id/approve')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  approve(@Param('id', ParseIntPipe) id: number, @Req() req) {
    console.log('controller: ', req.user);
    return this.leaveRequestsService.handleApprove(id, req.user.employeeId);
  }

  @Put(':id/reject')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  reject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RejectLeaveRequestDto,
    @Req() req,
  ) {
    return this.leaveRequestsService.handleReject(id, req.user.employeeId, dto);
  }
}
