import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { UserModule } from '../user/user.module';
import { DishModule } from '../dish/dish.module';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [ TypeOrmModule.forFeature([Rating]),UserModule,DishModule],
  
})
export class RatingModule {}
