import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionHttpService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('FAKE_API_URL');
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    config: AxiosRequestConfig = {},
    data?: any,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
      },
      method,
      url,
      data: method !== 'GET' ? data : undefined,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.request<T>(requestConfig),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Request failed',
        error.response?.status || 500,
      );
    }
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.request<T>('GET', path, config);
  }

  async post<T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await this.request<T>('POST', path, config, data);
  }

  async put<T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await this.request<T>('PUT', path, config, data);
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.request<T>('DELETE', path, config);
  }

  async patch<T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await this.request<T>('PATCH', path, config, data);
  }
}