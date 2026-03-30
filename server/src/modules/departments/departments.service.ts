import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async handleCreateDepartment(createDepartmentDto: CreateDepartmentDto) {
    const { name, budget, description } = createDepartmentDto;

    // 1. Check tên department đã tồn tại chưa
    const existing = await this.prisma.department.findUnique({
      where: { name },
    });

    if (existing) {
      throw new BadRequestException(`Department "${name}" already exists`);
    }

    // 2. Tạo department
    const department = await this.prisma.department.create({
      data: {
        name,
        description,
        budget,
      },
    });

    return department;
  }

  findAll() {
    return `This action returns all departments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
