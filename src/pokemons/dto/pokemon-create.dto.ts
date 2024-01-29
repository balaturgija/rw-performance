import { ApiProperty } from '@nestjs/swagger';

export class PokemonCreateDto {
  @ApiProperty()
  name: string;
}
