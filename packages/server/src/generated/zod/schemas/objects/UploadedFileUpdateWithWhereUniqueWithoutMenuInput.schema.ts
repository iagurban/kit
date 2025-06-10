import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithoutMenuInputObjectSchema } from './UploadedFileUpdateWithoutMenuInput.schema';
import { UploadedFileUncheckedUpdateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpdateWithWhereUniqueWithoutMenuInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UploadedFileUpdateWithoutMenuInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpdateWithWhereUniqueWithoutMenuInputObjectSchema = Schema;
