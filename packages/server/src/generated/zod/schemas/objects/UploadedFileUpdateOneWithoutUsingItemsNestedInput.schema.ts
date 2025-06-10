import { z } from 'zod';
import { UploadedFileCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateWithoutUsingItemsInput.schema';
import { UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUsingItemsInput.schema';
import { UploadedFileCreateOrConnectWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateOrConnectWithoutUsingItemsInput.schema';
import { UploadedFileUpsertWithoutUsingItemsInputObjectSchema } from './UploadedFileUpsertWithoutUsingItemsInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithoutUsingItemsInputObjectSchema } from './UploadedFileUpdateWithoutUsingItemsInput.schema';
import { UploadedFileUncheckedUpdateWithoutUsingItemsInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutUsingItemsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpdateOneWithoutUsingItemsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UploadedFileCreateWithoutUsingItemsInputObjectSchema),
        z.lazy(() => UploadedFileUncheckedCreateWithoutUsingItemsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UploadedFileCreateOrConnectWithoutUsingItemsInputObjectSchema).optional(),
    upsert: z.lazy(() => UploadedFileUpsertWithoutUsingItemsInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UploadedFileUpdateWithoutUsingItemsInputObjectSchema),
        z.lazy(() => UploadedFileUncheckedUpdateWithoutUsingItemsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UploadedFileUpdateOneWithoutUsingItemsNestedInputObjectSchema = Schema;
