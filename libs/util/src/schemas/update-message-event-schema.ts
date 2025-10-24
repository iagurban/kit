import { z } from 'zod/v4';

import { stringifiedBigint } from '../zod';
import { buildMessageEventSchema } from './raw-event-schema-parts';

export const updateMessageEventSchema = buildMessageEventSchema(stringifiedBigint);
export type UpdateMessageEventDTO = z.infer<typeof updateMessageEventSchema>;
