import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateOrConnectWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateOrConnectWithoutUsingItemsInput.schema';
import { UploadedFileCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateWithoutUsingItemsInput.schema';
import { UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUsingItemsInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

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
