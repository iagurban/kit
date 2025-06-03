import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileUncheckedUpdateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutMenuInput.schema';
import { UploadedFileUpdateWithoutMenuInputObjectSchema } from './UploadedFileUpdateWithoutMenuInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

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
