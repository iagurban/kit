import { stringifiedBigint } from '@poslah/util/zod';
import { z } from 'zod/v4';

import { buildMessageEventSchema } from './raw-event-schema-parts';

export const updateMessageEventSchema = buildMessageEventSchema(stringifiedBigint);
export type UpdateMessageEventDTO = z.infer<typeof updateMessageEventSchema>;
