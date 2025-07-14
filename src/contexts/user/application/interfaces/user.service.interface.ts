import { UserEntity } from "../../commom/entities/user.entity";
import { CreateUserDto } from "../../presentation/dtos/create.dto";
import { UpdatePasswordDto } from "../../presentation/dtos/update.dto";

export abstract class IUserService {
  abstract create(data: CreateUserDto): Promise<UserEntity>;
  abstract findByLogin(login: string): Promise<UserEntity | null>;
  abstract updatePassword(dto: UpdatePasswordDto, userId: number): Promise<void>;
}