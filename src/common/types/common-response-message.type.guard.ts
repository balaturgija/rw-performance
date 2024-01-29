import { CommonExceptionResponse } from './common-exception-response.type';

export function isResponseObject(
  data: string | object,
): data is CommonExceptionResponse {
  if (!data) return false;

  const object = data as CommonExceptionResponse;
  return object.message !== undefined && object.statusCode !== undefined;
}
