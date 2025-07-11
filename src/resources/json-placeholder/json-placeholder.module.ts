import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionHttpService } from './services/transaction-http.service';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [TransactionService, TransactionHttpService],
  exports: [TransactionService],
})
export class TransactionModule { }