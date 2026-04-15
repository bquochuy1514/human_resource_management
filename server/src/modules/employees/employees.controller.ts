import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';
import { QueryEmployeeDto } from './dto/query-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.handleCreateEmployee(createEmployeeDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllEmployees(@Query() query: QueryEmployeeDto) {
    return this.employeesService.handleFindAllEmployees(query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  fineOneEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.handleFindOneEmployee(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.handleUpdateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.handleDeleteEmployee(id);
  }
}
