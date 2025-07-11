import { LoginDto } from "../../presentation/dtos/login.dto";

export interface IAuthService {
  login(loginDto: LoginDto): Promise<{ access_token: string }>;
  validateUser(login: string, password: string): Promise<any>;
}