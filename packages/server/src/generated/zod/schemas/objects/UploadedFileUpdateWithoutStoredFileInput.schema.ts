import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutUploadedFilesNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutUploadedFilesNestedInput.schema';
import { MenuUpdateOneRequiredWithoutFilesNestedInputObjectSchema } from './MenuUpdateOneRequiredWithoutFilesNestedInput.schema';
import { ItemUpdateManyWithoutImageNestedInputObjectSchema } from './ItemUpdateManyWithoutImageNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpdateWithoutStoredFileInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    originalName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    mimetype: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    uploadedAt: z
      .union([z.coerce.dateStr(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    uploader: z.lazy(() => UserUpdateOneRequiredWithoutUploadedFilesNestedInputObjectSchema).optional(),
    menu: z.lazy(() => MenuUpdateOneRequiredWithoutFilesNestedInputObjectSchema).optional(),
    usingItems: z.lazy(() => ItemUpdateManyWithoutImageNestedInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileUpdateWithoutStoredFileInputObjectSchema = Schema;
