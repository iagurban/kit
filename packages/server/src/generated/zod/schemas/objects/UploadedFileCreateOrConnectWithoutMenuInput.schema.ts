import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileCreateWithoutMenuInputObjectSchema } from './UploadedFileCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateOrConnectWithoutMenuInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutMenuInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileCreateOrConnectWithoutMenuInputObjectSchema = Schema;
