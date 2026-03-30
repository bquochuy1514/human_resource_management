import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import { hashPassword } from 'src/common/utils/hash-password.util';

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
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
            },
          },
          department: true,
        },
      });

      return employee;
    });

    return result;
  }

  handleFindAllEmployees() {
    return this.prisma.employee.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
