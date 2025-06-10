import { z } from 'zod';
import { UploadedFileCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateWithoutUsingItemsInput.schema';
import { UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUsingItemsInput.schema';
import { UploadedFileCreateOrConnectWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateOrConnectWithoutUsingItemsInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateNestedOneWithoutUsingItemsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UploadedFileCreateWithoutUsingItemsInputObjectSchema),
        z.lazy(() => UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UploadedFileCreateOrConnectWithoutUsingItemsInputObjectSchema).optional(),
    connect: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileCreateNestedOneWithoutUsingItemsInputObjectSchema = Schema;
