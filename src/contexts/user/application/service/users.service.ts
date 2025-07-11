import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IUserService } from '../interfaces/user.service.interface';
import { IUserRepository } from '../../infra/interfaces/user.repository.interface';
import { CreateUserDto } from '../../presentation/dtos/create.dto';
import { UserEntity } from '../../commom/entities/user.entity';
import { UpdatePasswordDto } from '../../presentation/dtos/update.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) { }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await hash(data.password, 10);
    return this.userRepository.create({ ...data, password: hashedPassword });
  }

  async findByLogin(login: string): Promise<UserEntity | null> {
    return this.userRepository.findByLogin(login);
  }

  async updatePassword(dto: UpdatePasswordDto, userId: number): Promise<void> {
    const hashedPassword = await hash(dto.password, 10);
    await this.userRepository.updatePassword(userId, hashedPassword);
  }

}