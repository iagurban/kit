import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {}

@Injectable()
export class RedisSubscriptionService extends RedisService {}
