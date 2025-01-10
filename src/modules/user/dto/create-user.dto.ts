import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The userName of the user',
    example: 'AhmedAhmed',
  })
  @IsString()
  @IsNotEmpty({ message: 'UserName est obligatoire.' })
  userName: string;

  password: string;

  @ApiProperty({
    description: 'The role of the user (admin, student, or club)',
    example: 'admin',
    enum: ['admin', 'student'],
  })
  @IsNotEmpty({ message: 'Le rôle est obligatoire.' })
  @IsIn(['admin', 'student'], {
    message: 'Le rôle doit être soit admin ou student.',
  })
  role: string;
}
