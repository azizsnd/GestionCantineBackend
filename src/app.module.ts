import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthCompositeGuard } from './common/guards/auth-composite.guard';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { DishModule } from './modules/dish/dish.module';
import { RatingModule } from './modules/rating/rating.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      //synchronize: true,
      timezone: 'Z',
      
    }),
    DishModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesGuard,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthCompositeGuard,
    },
  ],
})
export class AppModule {}
