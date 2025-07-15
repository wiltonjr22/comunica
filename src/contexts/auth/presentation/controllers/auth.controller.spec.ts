import { AuthController } from './auth.controller';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto, LoginResponseDto } from '../dtos/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockLoginDto: LoginDto = {
    login: 'testuser',
    password: 'testpass',
  };

  const mockTokenResponse: LoginResponseDto = {
    access_token: 'jwt-token',
  };

  beforeEach(() => {
    authService = {
      login: jest.fn().mockResolvedValue(mockTokenResponse),
    } as unknown as AuthService;

    authController = new AuthController(authService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token on valid credentials', async () => {
      const result = await authController.login(mockLoginDto);

      expect(authService.login).toHaveBeenCalledWith(mockLoginDto);
      expect(result).toEqual(mockTokenResponse);
    });

    it('should throw UnauthorizedException if login fails', async () => {
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new UnauthorizedException('credencias invalidas'));

      await expect(authController.login(mockLoginDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
