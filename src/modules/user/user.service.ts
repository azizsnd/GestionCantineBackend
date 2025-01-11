import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectRepository(User) private userRep: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRep.findOne({
        where: [{ userName: createUserDto.userName }],
      });

      if (existingUser) {
        throw new BadRequestException(
          'User with this userName already exists',
        );
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
      createUserDto.password = hashedPassword;

      const newUser = this.userRep.create(createUserDto);
      await this.userRep.save(newUser);
      return newUser;
    } catch (error) {
      this.logger.error("Error creating user:", error.message);
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.userRep.find();
    } catch (error) {
      this.logger.error("Error finding users:", error.message);
      throw new BadRequestException(`Failed to find users: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRep.findOneBy({ id: id });
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } catch (error) {
      this.logger.error("Error finding user:", error.message);
      throw new BadRequestException(`Failed to find user: ${error.message}`);
    }
  }

  async findUserName(userName: string) {
    try {
      const user = await this.userRep.findOneBy({ userName: userName });
      if (!user)
        throw new NotFoundException(`User with userName ${userName} not found`);
      return user;
    } catch (error) {
      this.logger.error("Error finding user:", error.message);
      throw new BadRequestException(`Failed to find user: ${error.message}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
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

      if (updateUserDto.userName) {
        const OtherUser = await this.userRep.findOne({
          where: {
            userName: updateUserDto.userName,
            id: Not(id),
          },
        });
        if (OtherUser) {
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'User with this userName already exists. ',
            },
            HttpStatus.CONFLICT,
          );
        }
      }
      const updatedUser = { ...existingUser, ...updateUserDto };
      return this.userRep.save(updatedUser);
    } catch (error) {
      this.logger.error("Error updating user:", error.message);
      throw new BadRequestException(`Failed to update user: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      return await this.userRep.delete({ id });
    } catch (error) {
      this.logger.error("Error removing user:", error.message);
      throw new BadRequestException(`Failed to remove user: ${error.message}`);
    }
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.findOne(id);
      const isCurrentPasswordValid = await bcrypt.compare(
        changePasswordDto.currentPassword, user.password,
      );

      if (!isCurrentPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }
      if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
        throw new BadRequestException('New password and confirm password do not match',);
      }
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(
        changePasswordDto.newPassword,
        saltRounds,
      );
      user.password = hashedNewPassword;
      await this.userRep.save(user);
      return 'Password successfully updated';
    } catch (error) {
      this.logger.error("Error changing password:", error.message);
      throw new BadRequestException(`Failed to change password: ${error.message}`);
    }
  }
}
