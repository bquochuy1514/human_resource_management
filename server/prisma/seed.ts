import { PrismaClient, UserRole } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const managementDept = await prisma.department.upsert({
    where: { name: 'Management' },
    update: {},
    create: {
      name: 'Management',
      description: 'Ban quản lý',
      budget: 0,
    },
  });

  console.log('===> Đã tạo phòng ban quản lý:', managementDept.name, ' <===');

  const password = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      fullName: 'Admin',
      email: 'admin@company.com',
      password,
      role: UserRole.ADMIN,
      employee: {
        create: {
          employeeCode: 'EMP-001',
          position: 'System Administrator',
          hireDate: new Date(),
          departmentId: managementDept.id, // tạo department trước rồi mới seed admin
        },
      },
    },
  });
  console.log('===> Đã tạo admin:', admin.email, ' <===');

  const departments = [
    {
      name: 'Engineering',
      description: 'Phòng kỹ thuật & phát triển phần mềm',
      budget: 500000000,
    },
    {
      name: 'Sales',
      description: 'Phòng kinh doanh & bán hàng',
      budget: 300000000,
    },
    {
      name: 'Marketing',
      description: 'Phòng marketing & truyền thông',
      budget: 200000000,
    },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    });
    console.log(`===> Đã tạo department: ${dept.name} <===`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
