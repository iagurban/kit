import { z } from 'zod';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUpdateManyMutationInputObjectSchema } from './UploadedFileUpdateManyMutationInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutFilesInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutFilesInput.schema';

import type { Prisma } from '../../../old-client';

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
