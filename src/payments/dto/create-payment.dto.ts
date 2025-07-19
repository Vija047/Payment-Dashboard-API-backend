import { IsNumber, IsString, IsIn, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  receiver: string;

  @IsIn(['success', 'failed', 'pending'])
  status: string;

  @IsString()
  method: string;

  @IsDateString()
  date: string;
} 