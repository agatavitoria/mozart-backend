import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const NODE_ENV = configService.getOrThrow<string>('NODE_ENV');

export const APP_PORT = configService.getOrThrow<number>('APP_PORT');
export const APP_VERSION = configService.getOrThrow<string>('APP_VERSION');
export const APP_VERSION_PREFIX =
  configService.getOrThrow<string>('APP_VERSION_PREFIX');
export const APP_CONTAINER_NAME =
  configService.getOrThrow<string>('APP_CONTAINER_NAME');

export const DATABASE_URL = configService.getOrThrow<string>('DATABASE_URL');

export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;

export const JWT_ACCESS_SECRET =
  configService.getOrThrow<string>('JWT_ACCESS_SECRET');
export const JWT_ACCESS_SECRET_EXPIRES_IN = configService.getOrThrow<string>(
  'JWT_ACCESS_SECRET_EXPIRES_IN',
);

export const CACHE_MAX_NUMBER =
  configService.getOrThrow<string>('CACHE_MAX_NUMBER');
export const CACHE_TIME_TO_LIVE =
  configService.getOrThrow<string>('CACHE_TIME_TO_LIVE');
