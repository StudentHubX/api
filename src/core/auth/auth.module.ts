import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entity/department.entity';
import { Professional } from 'src/entity/professional.entity';
import { Student } from 'src/entity/student.entity';
import { Industry } from 'src/entity/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Department, Professional, Student, Industry])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
