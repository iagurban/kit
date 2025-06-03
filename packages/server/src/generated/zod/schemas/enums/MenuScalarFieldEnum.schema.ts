import { z } from 'zod';

export const MenuScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'title', 'ownerId']);
