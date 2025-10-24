import { z } from 'zod/v4';

import { stringifiedBigint } from '../zod';
import { buildMessageEventSchema } from './raw-event-schema-parts';

export const someMessageEventSchema = buildMessageEventSchema(stringifiedBigint.nullable());
export type MessageEventDto = z.infer<typeof someMessageEventSchema>;
