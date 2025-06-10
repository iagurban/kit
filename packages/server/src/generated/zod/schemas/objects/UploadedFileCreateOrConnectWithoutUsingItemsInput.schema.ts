import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateWithoutUsingItemsInput.schema';
import { UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUsingItemsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateOrConnectWithoutUsingItemsInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutUsingItemsInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileCreateOrConnectWithoutUsingItemsInputObjectSchema = Schema;
