import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn, IsString, IsNumber, IsBoolean, IsUrl, IsOptional } from 'class-validator';

export class CreateDishDto {
    @ApiProperty({
        description: 'The name of the dish',
        example: 'Spaghetti Bolognese',
    })
    @IsNotEmpty({ message: 'Le nom est obligatoire.' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The quantity of the dish',
        example: 10,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Whether the dish is checked',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    checked: boolean;

    @ApiProperty({
        description: 'The URL of the dish image',
        example: 'http://example.com/image.jpg',
    })
    @IsNotEmpty({ message: 'L\'URL de l\'image est obligatoire.' })
    imageUrl: string;

    @ApiProperty({
        description: 'The type of the dish',
        example: 'Main Course',
        enum: ['Appetizers', 'Main Course', 'Desserts'],
    })
    @IsNotEmpty({ message: 'Le type est obligatoire.' })
    @IsIn(['Appetizers', 'Main Course', 'Desserts'], {
        message: 'Le type doit être soit Appetizers ou Main Course ou Desserts.',
    })
    type: string;
}