import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class MatchOrdersService {
  @Interval(1000)
  matchOrders() {}
}
