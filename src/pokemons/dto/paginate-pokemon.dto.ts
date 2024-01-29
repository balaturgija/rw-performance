import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PaginatePokemontDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  page: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  size: number;
}
