import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function OpenApiController(
  controllerPath: string,
  version: string[] = ['1'],
) {
  return applyDecorators(
    Controller({ path: controllerPath, version: version }),
    ApiTags(controllerPath),
  );
}
