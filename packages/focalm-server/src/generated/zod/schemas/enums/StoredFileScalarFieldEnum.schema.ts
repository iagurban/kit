import { z } from 'zod';

export const StoredFileScalarFieldEnumSchema = z.enum(['id', 'hash', 'size', 'createdAt']);
