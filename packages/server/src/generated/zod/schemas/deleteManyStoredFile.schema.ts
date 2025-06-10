import { z } from 'zod';
import { StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';

export const StoredFileDeleteManySchema = z.object({ where: StoredFileWhereInputObjectSchema.optional() });
