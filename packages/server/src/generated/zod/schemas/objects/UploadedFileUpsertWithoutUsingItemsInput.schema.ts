import { z } from 'zod';
import { UploadedFileUpdateWithoutUsingItemsInputObjectSchema } from './UploadedFileUpdateWithoutUsingItemsInput.schema';
import { UploadedFileUncheckedUpdateWithoutUsingItemsInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutUsingItemsInput.schema';
import { UploadedFileCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateWithoutUsingItemsInput.schema';
import { UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUsingItemsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpsertWithoutUsingItemsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UploadedFileUpdateWithoutUsingItemsInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutUsingItemsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutUsingItemsInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpsertWithoutUsingItemsInputObjectSchema = Schema;
