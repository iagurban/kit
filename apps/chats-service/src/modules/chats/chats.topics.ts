import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import {
  createMessageEventSchema,
  infoEventSchema,
  rawEventSchema,
  updateMessageEventSchema,
} from './raw-event-schema';

export const chatsTopics = {
  // Raw event for internal processing
  rawCreate: declareEventsTopic('events.raw.create', rawEventSchema),

  // Notification events for other services
  messageCreated: declareEventsTopic('events.message.created', createMessageEventSchema),
  messagePatched: declareEventsTopic('events.message.patched', updateMessageEventSchema),
  infoPatched: declareEventsTopic('events.info.patched', infoEventSchema),
} as const;
