import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { UserService } from '../user/user.service';
import { DishService } from '../dish/dish.service';

@Injectable()
export class RatingService {

  constructor(
    @InjectRepository(Rating) private ratingRep: Repository<Rating>,
    private readonly userService: UserService,
    private readonly dishService: DishService,

  ) { }
  private readonly logger = new Logger(RatingService.name);

  async create(createRatingDto: CreateRatingDto) {
    try {
      const user = await this.userService.findOne(createRatingDto.idUser);
      const dish = await this.dishService.findOne(createRatingDto.idDish);
      const newDish = this.ratingRep.create(createRatingDto);
      return await this.ratingRep.save(newDish);
    } catch (error) {
      this.logger.error("Error creating rating:", error.message);
      throw new BadRequestException(`Failed to create rating: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.ratingRep
        .createQueryBuilder('rating')
        .leftJoinAndSelect('rating.idDish', 'dish')
        .leftJoinAndSelect('rating.idUser', 'user') 
        .select([
          'rating.id',
          'rating.nbStars',
          'rating.feedback',
          'dish.id',
          'user.id',
          'user.userName',
        ])
        .getMany();
    } catch (error) {
      this.logger.error("Error finding ratings:", error.message);
      throw new BadRequestException(`Failed to find ratings: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const rating = await this.ratingRep
        .createQueryBuilder('rating')
        .leftJoinAndSelect('rating.idDish', 'dish')
        .leftJoinAndSelect('rating.idUser', 'user')
        .select([
          'rating.id',
          'rating.nbStars',
          'rating.feedback',
          'dish.id',
          'user.id',
          'user.userName',
        ])
        .where('rating.id = :id', { id })
        .getOne();
  
      if (!rating) {
        throw new NotFoundException(`Rating with id ${id} not found`);
      }
  
      return rating;
    } catch (error) {
      this.logger.error("Error finding rating:", error.message);
      throw new BadRequestException(`Failed to find rating: ${error.message}`);
    }
  }
  async findByDishId(idDish: number) {
    try {
      const ratings = await this.ratingRep
        .createQueryBuilder('rating')
        .leftJoinAndSelect('rating.idUser', 'user') 
        .leftJoin('rating.idDish', 'dish')
        .select([
          'rating.id',
          'rating.nbStars',
          'rating.feedback',
          'dish.id',
          'user.id',
          'user.userName',
        ])
        .where('dish.id = :idDish', { idDish }) 
        .getMany();
      if (!ratings || ratings.length === 0) {
        throw new NotFoundException(`No ratings found for dish with id ${idDish}`);
      }
      return ratings;
    } catch (error) {
      this.logger.error("Error finding ratings by dish ID:", error.message);
      throw new BadRequestException(`Failed to find ratings by dish ID: ${error.message}`);
    }
  }
  async getAverageRatingForDish(idDish: number): Promise<number> {
    try {
      const result = await this.ratingRep
        .createQueryBuilder('rating')
        .leftJoin('rating.idDish', 'dish')
        .select('AVG(rating.nbStars)', 'averageRating') 
        .where('dish.id = :idDish', { idDish }) 
        .getRawOne();
  
      if (!result || result.averageRating === null) {
        result.averageRating=0;
      }
  
      return parseFloat(result.averageRating);
    } catch (error) {
      this.logger.error("Error calculating average rating for dish:", error.message);
      throw new BadRequestException(`Failed to calculate average rating: ${error.message}`);
    }
  }

  async getTopFeedbacks(limit: number = 4): Promise<Rating[]> {
    try {
      const topFeedbacks = await this.ratingRep
      .createQueryBuilder('rating')
      .leftJoinAndSelect('rating.idDish', 'dish')
      .leftJoinAndSelect('rating.idUser', 'user') 
      .select([
        'rating.id',
        'rating.nbStars',
        'rating.feedback',
        'dish.id',
        'user.id',
        'user.userName',
      ])
        .orderBy('rating.nbStars', 'DESC') 
        .limit(limit) 
        .getMany();
  
      if (!topFeedbacks || topFeedbacks.length === 0) {
        throw new NotFoundException('No feedbacks found');
      }
  
      return topFeedbacks;
    } catch (error) {
      this.logger.error('Error fetching top feedbacks:', error.message);
      throw new BadRequestException(`Failed to fetch top feedbacks: ${error.message}`);
    }
  }
  async update(id: number, updateRatingDto: UpdateRatingDto) {
    try {
      const existingRating = await this.findOne(id);
      const updatedRating = { ...existingRating, ...updateRatingDto };
      return this.ratingRep.save(updatedRating);
    } catch (error) {
      this.logger.error("Error updating rating:", error.message);
      throw new BadRequestException(`Failed to update rating: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const rating = await this.findOne(id);
      return await this.ratingRep.delete({ id });
    } catch (error) {
      this.logger.error("Error removing rating:", error.message);
      throw new BadRequestException(`Failed to remove rating: ${error.message}`);
    }
  }
}
