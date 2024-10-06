import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from 'src/entities/professional.entity';
import { Student } from 'src/entities/student.entity';
import { Industry } from 'src/entities/industry.entity';
import { Faculty } from 'src/entities/faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Faculty, Professional, Student, Industry])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
