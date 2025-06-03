import { z } from 'zod';

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id', 'userId', 'createdAt', 'expiresAt', 'hash']);
