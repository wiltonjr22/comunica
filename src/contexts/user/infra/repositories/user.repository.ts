import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { PrismaService } from '@/resources/database/prisma/prisma.service';
import { CreateUserDto } from '../../presentation/dtos/create.dto';
import { UserEntity } from '../../commom/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.create({ data });
    return user as UserEntity;
  }

  async findByLogin(login: string): Promise<UserEntity | null> {
    return await this.prisma.user.findFirst({
      where: { login },
    }) as UserEntity | null;
  }
  async updatePassword(userId: number, hashedPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}