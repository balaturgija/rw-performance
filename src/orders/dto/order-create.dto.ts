import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, Max, Min } from 'class-validator';

import { OrderType } from '../types/order-type';

export class OrderCreateDto {
  @ApiProperty({ enum: [...Object.values(OrderType)], enumName: 'OrderType' })
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  @Min(4.0)
  @Max(100.0)
  price: number;
}
