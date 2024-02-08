import { ApiProperty } from '@nestjs/swagger';

export class ValidationExceptionResponseDto {
  @ApiProperty()
  status: number;
  @ApiProperty()
  timestamp: number;
  @ApiProperty()
  path: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: String, isArray: true })
  message: string[];
}
