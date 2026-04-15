import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import { hashPassword } from 'src/common/utils/hash-password.util';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { EmployeeStatus, Prisma } from 'generated/prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async handleCreateEmployee(createEmployeeDto: CreateEmployeeDto) {
    const { departmentId, email, fullName, hireDate, position, salary } =
      createEmployeeDto;

    // 1. Check email đã tồn tại chưa
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException(`Email ${email} already exists`);
    }

    // 2. Check department có tồn tại không
    const department = await this.prisma.department.findUnique({
      where: { id: departmentId },
    });
    if (!department) {
      throw new NotFoundException(`Department #${departmentId} not found`);
    }

    // 3. Generate employeeCode
    const count = await this.prisma.employee.count();
    const employeeCode = `EMP-${String(count + 1).padStart(3, '0')}`;

    // 4. Generate default password
    const defaultPassword = await hashPassword('123456');

    // 5. Tạo User + Employee trong 1 transaction
    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          email,
          password: defaultPassword,
        },
      });

      const employee = await tx.employee.create({
        data: {
          userId: user.id,
          employeeCode,
          position,
          departmentId,
          hireDate: new Date(hireDate),
          salary,
        },
        include: {
          user: {
            omit: {
              hashedRefreshToken: true,
              password: true,
            },
          },
          department: true,
        },
      });

      return employee;
    });

    return result;
  }

  async handleFindAllEmployees(query: QueryEmployeeDto) {
    const { search, departmentId, status, page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeWhereInput = {
      ...(status && { status }),
      ...(departmentId && { departmentId }),
      ...(search && {
        OR: [
          { employeeCode: { contains: search, mode: 'insensitive' } },
          { user: { fullName: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            omit: {
              password: true,
              hashedRefreshToken: true,
            },
          },
          department: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.employee.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async handleFindOneEmployee(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        user: {
          omit: {
            hashedRefreshToken: true,
            password: true,
          },
        },
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return employee;
  }

  async handleUpdateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { fullName, position, departmentId, salary, status, phone, avatar } =
      updateEmployeeDto;

    // 1. Check employee tồn tại
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    // 2. Nếu có đổi department thì check department tồn tại không
    if (departmentId) {
      const department = await this.prisma.department.findUnique({
        where: { id: departmentId },
      });
      if (!department) {
        throw new NotFoundException(`Department #${departmentId} not found`);
      }
    }

    // 3. Update trong transaction vì đụng 2 bảng User + Employee
    const result = await this.prisma.$transaction(async (tx) => {
      if (fullName) {
        await tx.user.update({
          where: { id: employee.userId },
          data: { fullName },
        });
      }

      return tx.employee.update({
        where: { id },
        data: {
          ...(position && { position }),
          ...(departmentId && { departmentId }),
          ...(salary && { salary }),
          ...(status && { status }),
          ...(phone && { phone }),
          ...(avatar && { avatar }),
        },
        include: {
          user: {
            omit: {
              password: true,
              hashedRefreshToken: true,
            },
          },
          department: true,
        },
      });
    });

    return result;
  }

  async handleDeleteEmployee(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    if (employee.status === EmployeeStatus.INACTIVE) {
      throw new BadRequestException(`Employee #${id} is already inactive`);
    }

    return this.prisma.employee.update({
      where: { id },
      data: { status: EmployeeStatus.INACTIVE },
    });
  }
}
