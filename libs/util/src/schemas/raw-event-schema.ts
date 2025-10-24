import { z } from 'zod/v4';

import { infoEventSchema } from './info-event-schema';
import { membershipEventSchema } from './membership-event-schema';
import { someMessageEventSchema } from './some-message-event-schema';

export const rawEventSchema = z.discriminatedUnion('type', [
  someMessageEventSchema,
  infoEventSchema,
  membershipEventSchema,
]);

export type RawEventDto = z.infer<typeof rawEventSchema>;
