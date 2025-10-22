import { z } from 'zod/v4';

import { buildMessageEventSchema } from './raw-event-schema-parts';

export const createMessageEventSchema = buildMessageEventSchema(z.literal(null));
export type CreateMessageEventDTO = z.infer<typeof createMessageEventSchema>;
