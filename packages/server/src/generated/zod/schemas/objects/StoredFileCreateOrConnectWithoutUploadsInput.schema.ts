import { z } from 'zod';
import { StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileCreateOrConnectWithoutUploadsInput> = z
  .object({
    where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => StoredFileCreateWithoutUploadsInputObjectSchema),
      z.lazy(() => StoredFileUncheckedCreateWithoutUploadsInputObjectSchema),
    ]),
  })
  .strict();

export const StoredFileCreateOrConnectWithoutUploadsInputObjectSchema = Schema;
