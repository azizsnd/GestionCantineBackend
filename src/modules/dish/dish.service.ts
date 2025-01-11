import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish) private dishRep: Repository<Dish>,
  ) {}
  private readonly logger = new Logger(DishService.name);

  async create(createDishDto: CreateDishDto) {
    try {
      const newDish = this.dishRep.create(createDishDto);
      return await this.dishRep.save(newDish);
    } catch (error) {
      this.logger.error("Error creating dish:", error.message);
      throw new BadRequestException(`Failed to create dish: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.dishRep.find();
    } catch (error) {
      this.logger.error("Error finding dishes:", error.message);
      throw new BadRequestException(`Failed to find dishes: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const dish = await this.dishRep.findOneBy({ id });
      if (!dish) {
        throw new NotFoundException(`Dish with id ${id} not found`);
      }
      return dish;
    } catch (error) {
      this.logger.error("Error finding dish:", error.message);
      throw new BadRequestException(`Failed to find dish: ${error.message}`);
    }
  }

  async findDailyMenu() {
    try {
      return await this.dishRep.findBy({checked: true});
    } catch (error) {
      this.logger.error("Error finding daily menu dishes:", error.message);
      throw new BadRequestException(`Failed to find daily menu dishes: ${error.message}`);
    }
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    try {
      const existingDish = await this.findOne(id);
      const updatedDish = { ...existingDish, ...updateDishDto };
      return this.dishRep.save(updatedDish);
    } catch (error) {
      this.logger.error("Error updating dish:", error.message);
      throw new BadRequestException(`Failed to update dish: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const dish = await this.findOne(id);
      return await this.dishRep.delete({ id });
    } catch (error) {
      this.logger.error("Error removing dish:", error.message);
      throw new BadRequestException(`Failed to remove dish: ${error.message}`);
    }
  }
}
