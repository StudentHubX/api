import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Professional } from 'src/entities/professional.entity';
import { Student } from 'src/entities/student.entity';
import { Industry } from 'src/entities/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Department, Professional, Student, Industry])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
