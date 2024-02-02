import { ApiProperty } from '@nestjs/swagger';
import { Generation } from '../types/generation';
import { IsEnum } from 'class-validator';

export class PokemonGenerationDto {
  @ApiProperty({
    enum: Generation,
    enumName: 'Generation',
  })
  @IsEnum(Generation, { message: 'generation must be valid' })
  generation: Generation;
}
