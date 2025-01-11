import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Ratings')
@ApiBearerAuth()
@Controller('rating')
@Public()
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get('dish/:idDish')
  findByDishId(@Param('idDish') idDish: number) {
    return this.ratingService.findByDishId(idDish);
  }
  
  @Get('dish-average/:idDish')
  getAverageRatingForDish(@Param('idDish') idDish: number) {
    return this.ratingService.getAverageRatingForDish(idDish);
  }

  @Get('top-feedbacks')
  getTopFeedbacks() {
    return this.ratingService.getTopFeedbacks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
