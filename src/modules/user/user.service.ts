import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateRandomPassword } from 'src/utils/password.util';
import { sendEmail } from 'src/utils/email.util';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRep: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRep.findOne({
      where: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with this email or phone number already exists',
      );
    }

    // Générer un mot de passe aléatoire
    const randomPassword = generateRandomPassword();

    // Hasher le mot de passe avant de le sauvegarder
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);
    createUserDto.password = hashedPassword;

    const newUser = this.userRep.create(createUserDto);
    await this.userRep.save(newUser);
    await sendEmail(
      createUserDto.email,
      'Welcome! Here is your password',
      `Welcome to our platform! Your auto-generated password is: ${randomPassword}`,
    );
    return newUser;
  }

  async findAll() {
    return await this.userRep.find();
  }

  async findOne(id: number) {
    const user = await this.userRep.findOneBy({ id: id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findEmail(email: string) {
    const user = await this.userRep.findOneBy({ email: email });
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if ('password' in updateUserDto || 'role' in updateUserDto) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Updating password or role is not allowed. ',
        },
        HttpStatus.CONFLICT,
      );
    }

    const existingUser = await this.findOne(id);

    if (updateUserDto.email) {
      const OtherUser = await this.userRep.findOne({
        where: {
          email: updateUserDto.email,
          id: Not(id),
        },
      });
      if (OtherUser) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'User with this email already exists. ',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
    if (updateUserDto.phone) {
      const OtherUser = await this.userRep.findOne({
        where: {
          phone: updateUserDto.phone,
          id: Not(id),
        },
      });
      if (OtherUser) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'User with this phone number already exists. ',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
    const updatedUser = { ...existingUser, ...updateUserDto };
    return this.userRep.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRep.delete({ id: id });
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.findOne(id);
    // Validate current password
    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Check if new password and confirm password match
    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new BadRequestException(
        'New password and confirm password do not match',
      );
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      saltRounds,
    );

    // Update the user's password
    user.password = hashedNewPassword;
    await this.userRep.save(user);

    return 'Password successfully updated';
  }
}
