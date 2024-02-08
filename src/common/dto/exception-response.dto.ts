import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponseDto {
  @ApiProperty()
  status: number;
  @ApiProperty()
  timestamp: number;
  @ApiProperty()
  path: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  message: string;
}
