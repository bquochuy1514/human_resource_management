import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async handleCreateDepartment(createDepartmentDto: CreateDepartmentDto) {
    const { name, budget, description } = createDepartmentDto;

    const existing = await this.prisma.department.findUnique({
      where: { name },
    });
    if (existing) {
      throw new BadRequestException(`Department "${name}" already exists`);
    }

    return this.prisma.department.create({
      data: { name, description, budget },
    });
  }

  async handleFindAllDepartments() {
    const departments = await this.prisma.department.findMany({
      where: { isActive: true },
      include: {
        manager: {
          include: {
            user: {
              omit: { password: true, hashedRefreshToken: true },
            },
          },
        },
        _count: {
          select: { employees: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return departments.map((dept) => ({
      ...dept,
      employeeCount: dept._count.employees,
      _count: undefined,
    }));
  }

  async handleFindOneDepartment(id: number) {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: {
        manager: {
          include: {
            user: {
              omit: { password: true, hashedRefreshToken: true },
            },
          },
        },
        employees: {
          where: { status: 'ACTIVE' },
          include: {
            user: {
              omit: { password: true, hashedRefreshToken: true },
            },
          },
        },
        _count: {
          select: { employees: true },
        },
      },
    });

    if (!department) {
      throw new NotFoundException(`Department #${id} not found`);
    }

    return {
      ...department,
      employeeCount: department._count.employees,
      _count: undefined,
    };
  }

  async handleUpdateDepartment(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const { name, description, budget, managerId, isActive } =
      updateDepartmentDto;

    // 1. Check department tồn tại
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException(`Department #${id} not found`);
    }

    // 2. Nếu đổi tên thì check trùng tên không
    if (name && name !== department.name) {
      const existing = await this.prisma.department.findUnique({
        where: { name },
      });
      if (existing) {
        throw new BadRequestException(`Department "${name}" already exists`);
      }
    }

    // 3. Nếu set manager thì check employee tồn tại và thuộc department này không
    if (managerId) {
      const employee = await this.prisma.employee.findUnique({
        where: { id: managerId },
      });
      if (!employee) {
        throw new NotFoundException(`Employee #${managerId} not found`);
      }
      if (employee.departmentId !== id) {
        throw new BadRequestException(
          `Employee #${managerId} does not belong to this department`,
        );
      }
    }

    return this.prisma.department.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(budget && { budget }),
        ...(managerId && { managerId }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        manager: {
          include: {
            user: {
              omit: { password: true, hashedRefreshToken: true },
            },
          },
        },
        _count: {
          select: { employees: true },
        },
      },
    });
  }

  async handleDeleteDepartment(id: number) {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: {
        _count: { select: { employees: true } },
      },
    });

    if (!department) {
      throw new NotFoundException(`Department #${id} not found`);
    }

    if (!department.isActive) {
      throw new BadRequestException(`Department #${id} is already inactive`);
    }

    // Không cho xóa nếu còn nhân viên active
    if (department._count.employees > 0) {
      throw new BadRequestException(
        `Cannot deactivate department with ${department._count.employees} active employees`,
      );
    }

    return this.prisma.department.update({
      where: { id },
      data: { isActive: false },
      select: { id: true, name: true, isActive: true },
    });
  }
}
