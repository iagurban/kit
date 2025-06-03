import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StoredFileUpdateOneRequiredWithoutUploadsNestedInputObjectSchema } from './StoredFileUpdateOneRequiredWithoutUploadsNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpdateWithoutUploaderInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    originalName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    mimetype: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    uploadedAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    storedFile: z.lazy(() => StoredFileUpdateOneRequiredWithoutUploadsNestedInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileUpdateWithoutUploaderInputObjectSchema = Schema;
