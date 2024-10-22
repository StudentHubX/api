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

import { StudentModule } from './core/student/student.module';
import { ProfessionalModule } from './core/professional/professional.module';
import { IndustryModule } from './industry/industry.module';
import { FacultiesModule } from './faculties/faculties.module';
import { ResourcesModule } from './resources/resources.module';
import { SpacesModule } from './spaces/spaces.module';

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
      host: process.env.PG_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PostsModule,
    AiModule,
    StudentModule,
    ProfessionalModule,
    IndustryModule,
    FacultiesModule,
    ResourcesModule,
    SpacesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
