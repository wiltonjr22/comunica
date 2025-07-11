import { UserEntity } from "../../commom/entities/user.entity";
import { CreateUserDto } from "../../presentation/dtos/create.dto";

export abstract class IUserRepository {
  abstract create(data: CreateUserDto): Promise<UserEntity>;
  abstract findByLogin(login: string): Promise<UserEntity | null>;
  abstract updatePassword(userId: number, hashedPassword: string): Promise<void>;
}