import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma.service';
import { EmployeesModule } from './modules/employees/employees.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { AttendancesModule } from './modules/attendances/attendances.module';
import { LeaveRequestsModule } from './modules/leave-requests/leave-requests.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    EmployeesModule,
    DepartmentsModule,
    AttendancesModule,
    LeaveRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
