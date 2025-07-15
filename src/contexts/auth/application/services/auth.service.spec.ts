import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '@/contexts/user/application/interfaces/user.service.interface';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../presentation/dtos/login.dto';

// ✅ Mock direto de bcrypt antes de qualquer import que o use
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: IUserService;

  const mockUser = {
    id: 1,
    login: 'testuser',
    password: 'hashedpassword',
    name: 'John',
    surname: 'Doe',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test' });

    userService = {
      findByLogin: jest.fn().mockResolvedValue(mockUser),
    } as any;

    authService = new AuthService(userService, jwtService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa mocks entre testes
  });

  describe('validateUser', () => {
    it('should return user if password matches', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser('testuser', '123456');

      expect(userService.findByLogin).toHaveBeenCalledWith('testuser');
      expect(result).toEqual(mockUser);
    });

    it('should return null if password does not match', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.validateUser('testuser', 'wrong-password');

      expect(result).toBeNull();
    });

    it('should return null if user not found', async () => {
      (userService.findByLogin as jest.Mock).mockResolvedValue(null);

      const result = await authService.validateUser('nouser', '123456');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access_token when login is successful', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.login({
        login: 'testuser',
        password: '123456',
      } as LoginDto);

      expect(result).toHaveProperty('access_token');
    });

    it('should throw UnauthorizedException when user is invalid', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login({ login: 'testuser', password: 'wrongpass' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
