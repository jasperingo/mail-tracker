import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const DataParam = createParamDecorator(
  (prop: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const data = request.data;

    return prop ? data?.[prop] : data;
  },
);
