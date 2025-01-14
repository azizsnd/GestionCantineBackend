import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The userName of the user',
    example: 'AhmedAhmed',
  })
  @IsString()
  @IsNotEmpty({ message: 'UserName est obligatoire.' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'password est obligatoire.' })
  password: string;

  @ApiProperty({
    description: 'The role of the user (admin, student)',
    example: 'admin',
    enum: ['admin', 'student'],
  })
  @IsNotEmpty({ message: 'Le rôle est obligatoire.' })
  @IsIn(['admin', 'student'], {
    message: 'Le rôle doit être soit admin ou student.',
  })
  role: string;
}
