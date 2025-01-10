import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The current password of the user',
    example: 'currentPassword123',
  })
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  @IsNotEmpty({ message: 'Le mot de passe actuel est obligatoire.' })
  currentPassword: string;

  @ApiProperty({
    description: 'The new password that the user wants to set',
    example: 'newPassword123',
  })
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  @IsNotEmpty({ message: 'Le nouveau mot de passe est obligatoire.' })
  newPassword: string;

  @ApiProperty({
    description: 'The confirmation of the new password',
    example: 'newPassword123',
  })
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  @IsNotEmpty({ message: 'Le mot de passe de confirmation est obligatoire.' })
  confirmPassword: string;
}
