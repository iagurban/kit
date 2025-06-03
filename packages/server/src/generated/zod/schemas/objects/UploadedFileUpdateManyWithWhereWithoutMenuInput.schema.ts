import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutFilesInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutFilesInput.schema';
import { UploadedFileUpdateManyMutationInputObjectSchema } from './UploadedFileUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpdateManyWithWhereWithoutMenuInput> = z
  .object({
    where: z.lazy(() => UploadedFileScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => UploadedFileUpdateManyMutationInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateManyWithoutFilesInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpdateManyWithWhereWithoutMenuInputObjectSchema = Schema;
