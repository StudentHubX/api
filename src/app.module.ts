import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './posts/posts.module';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { DepartmentModule } from './department/department.module';
import { StudentModule } from './core/student/student.module';
import { ProfessionalModule } from './core/professional/professional.module';
import { IndustryModule } from './industry/industry.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres', // or 'postgres' directly
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PostsModule,
    AiModule,
    DepartmentModule,
    StudentModule,
    ProfessionalModule,
    IndustryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
