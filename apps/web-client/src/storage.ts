import { JsonObject } from '@gurban/kit/core/json-type.ts';
import { attachmentInfoSchema, forwardInfoSchema } from '@poslah/chats-service/entities/raw-event-schema.ts';
import { messageSchema } from '@poslah/messages-service/modules/messages/messages-db.ts';
import {
  isoStringToDateTransform,
  Model,
  model,
  prop,
  SnapshotInOf,
  stringToBigIntTransform,
} from 'mobx-keystone';
import { z } from 'zod';

type StaticAssert<T extends true> = T;

type AssertExtends<T, U extends T> = T extends U ? true : false;

@model(`poslah/AttachmentInfo`)
class AttachmentInfoStore extends Model({
  fileId: prop<string>().withSetter(),
  mimeType: prop<string>().withSetter(),
  url: prop<string>().withSetter(),
  filename: prop<string>().withSetter(),
  size: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  metadata: prop<Record<string, unknown> | null>(null).withSetter(),
}) {
  static fromRaw(data: JsonObject) {
    const parsed = attachmentInfoSchema.parse(data);
    return new AttachmentInfoStore({ ...parsed });
  }
}

export type AttachmentInfoGuard = StaticAssert<
  AssertExtends<z.input<typeof attachmentInfoSchema>, SnapshotInOf<AttachmentInfoStore>>
>;

@model(`poslah/ForwardInfo`)
class ForwardInfoStore extends Model({
  chatId: prop<string>().withSetter(),
  nn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  text: prop<string | null>(null).withSetter(),
  authorId: prop<string>().withSetter(),
  createdAt: prop<string>().withTransform(isoStringToDateTransform()).withSetter(),
  attachments: prop<AttachmentInfoStore[]>(() => []).withSetter(),
}) {
  static fromRaw(data: JsonObject) {
    const parsed = forwardInfoSchema.parse(data);
    return new ForwardInfoStore({
      ...parsed,
      attachments: parsed.attachments?.map(a => new AttachmentInfoStore(a)),
    });
  }
}

export type ForwardInfoGuard = StaticAssert<
  AssertExtends<z.input<typeof forwardInfoSchema>, SnapshotInOf<ForwardInfoStore>>
>;

@model(`poslah/Message`)
class MessageStore extends Model({
  nn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  chatId: prop<string>().withSetter(),
  eventNn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  authorId: prop<string>().withSetter(),
  text: prop<string | null>().withSetter(),
  replyToNn: prop<string | null>().withTransform(stringToBigIntTransform()).withSetter(),
  attachments: prop<AttachmentInfoStore[] | null>().withSetter(),
  forwarded: prop<ForwardInfoStore[] | null>().withSetter(),
  createdAt: prop<string>().withTransform(isoStringToDateTransform()).withSetter(),
  updatedAt: prop<string>().withTransform(isoStringToDateTransform()).withSetter(),
  deletedAt: prop<string | null>().withTransform(isoStringToDateTransform()).withSetter(),
  editedAt: prop<string | null>().withTransform(isoStringToDateTransform()).withSetter(),
  editedNn: prop<string | null>().withTransform(stringToBigIntTransform()).withSetter(),
}) {
  static fromRaw(data: JsonObject) {
    const parsed = messageSchema.parse(data);
    return new MessageStore({
      ...parsed,
      attachments: parsed.attachments?.map(a => new AttachmentInfoStore(a)) ?? null,
      forwarded:
        parsed.forwarded?.map(
          a =>
            new ForwardInfoStore({
              ...a,
              attachments: a.attachments?.map(b => new AttachmentInfoStore(b)) ?? null,
            })
        ) ?? null,
    });
  }
}

export type MessageTypeGuard = StaticAssert<
  AssertExtends<z.input<typeof messageSchema>, SnapshotInOf<MessageStore>>
>;

@model(`poslah/RootStorage`)
export class RootStorage extends Model({}) {}
