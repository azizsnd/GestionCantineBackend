import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty({ message: 'UserName est obligatoire.' })
  userName: string;

  @Column()
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire.' })
  password: string;

  @Column()
  @IsNotEmpty({ message: 'Le rôle est obligatoire.' })
  @IsIn(['admin', 'student'], {
    message: 'Le rôle doit être soit admin ou student.',
  })
  role: string;
}
