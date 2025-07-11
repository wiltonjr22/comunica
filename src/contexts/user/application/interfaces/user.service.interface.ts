import { UserEntity } from "../../commom/entities/user.entity";
import { CreateUserDto } from "../../presentation/dtos/create.dto";
import { UpdatePasswordDto } from "../../presentation/dtos/update.dto";

export interface IUserService {
  create(data: CreateUserDto): Promise<UserEntity>;
  findByLogin(login: string): Promise<UserEntity | null>;
  updatePassword(dto: UpdatePasswordDto, userId: number): Promise<void>;
}