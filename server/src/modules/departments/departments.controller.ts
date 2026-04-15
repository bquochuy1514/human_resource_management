import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.handleCreateDepartment(createDepartmentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllDepartments() {
    return this.departmentsService.handleFindAllDepartments();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOneDepartment(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.handleFindOneDepartment(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.handleUpdateDepartment(
      id,
      updateDepartmentDto,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteDepartment(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.handleDeleteDepartment(id);
  }
}
