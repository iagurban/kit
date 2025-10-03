import { isDefined, isTruthy } from '@gurban/kit/core/checks';
import { Injectable } from '@nestjs/common';
import {
  AttachmentInfoDto,
  attachmentInfoSchema,
  ForwardInfoDto,
  forwardInfoSchema,
  MessageEventDto,
} from '@poslah/chats-service/modules/chats/raw-event-schema';
import { ScyllaService } from '@poslah/database/scylla/scylla.service';
import { ExtendedJsonValue } from '@poslah/util/json-type';
import { sortedIndex } from 'lodash';
import { z } from 'zod/v4';

export const messageSchema = z.object({
  chatId: z.uuid(),
  nn: z.coerce.bigint(),
  eventNn: z.coerce.bigint().nullable(),
  authorId: z.uuid(),
  text: z.string().nullable(),
  replyToNn: z.coerce.bigint().nullable(),
  attachments: z.array(attachmentInfoSchema).nullable(),
  forwarded: z.array(forwardInfoSchema).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  editedAt: z.coerce.date().nullable(),
  editedNn: z.coerce.bigint().nullable(),
});

export type MessageDto = z.infer<typeof messageSchema>;

/**
 * Maps the AttachmentInfoDto from the event to the snake_case format for ScyllaDB.
 */
const mapAttachmentToDb = (attachment: AttachmentInfoDto) => ({
  file_id: attachment.fileId,
  mime_type: attachment.mimeType,
  url: attachment.url,
  filename: attachment.filename,
  size: attachment.size,
  metadata: attachment.metadata,
});
// Infer the DB shape directly from the return type of the `toDb` function.
type AttachmentDb = ReturnType<typeof mapAttachmentToDb>;
export const mapAttachmentFromDb = (dbObject: AttachmentDb): AttachmentInfoDto => ({
  fileId: dbObject.file_id,
  mimeType: dbObject.mime_type,
  url: dbObject.url,
  filename: dbObject.filename,
  size: dbObject.size,
  metadata: dbObject.metadata,
});
type ForwardDb = ReturnType<typeof mapForwardToDb>;
export const mapForwardFromDb = (dbObject: ForwardDb): ForwardInfoDto => ({
  chatId: dbObject.chat_id,
  nn: dbObject.nn,
  text: dbObject.text,
  authorId: dbObject.author_id,
  createdAt: dbObject.created_at,
  attachments: dbObject.attachments?.map(mapAttachmentFromDb),
});

export const mapMessageToDb = (messageDto: MessageDto) => ({
  chat_id: messageDto.chatId,
  nn: messageDto.nn,
  event_nn: messageDto.eventNn,
  author_id: messageDto.authorId,
  text: messageDto.text,
  reply_to_nn: messageDto.replyToNn,
  attachments: messageDto.attachments?.map(mapAttachmentToDb),
  forwarded: messageDto.forwarded?.map(mapForwardToDb),
  created_at: messageDto.createdAt,
  updated_at: messageDto.updatedAt,
  edited_at: messageDto.editedAt,
  edited_nn: messageDto.editedNn,
});
type MessageDbRow = ReturnType<typeof mapMessageToDb>;
export const mapMessageFromDb = (dbRow: Partial<MessageDbRow>): Partial<MessageDto> => ({
  chatId: dbRow.chat_id,
  nn: dbRow.nn,
  eventNn: dbRow.event_nn,
  authorId: dbRow.author_id,
  text: dbRow.text,
  replyToNn: dbRow.reply_to_nn,
  attachments: dbRow.attachments?.map(mapAttachmentFromDb) ?? null,
  forwarded: dbRow.forwarded?.map(mapForwardFromDb) ?? null,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at,
  editedAt: dbRow.edited_at,
  editedNn: dbRow.edited_nn,
});

interface UpdateContext {
  latestEventTime: Date;
  latestEventNn: bigint;
}

const messagesDbInfo = (() => {
  const mapper = {
    chat_id: {
      cc: `chatId`,
      insertValue: event => event.chatId,
      updateValue: null,
    },
    nn: {
      cc: `nn`,
      insertValue: (event, nn) => nn,
      updateValue: null,
    },
    event_nn: {
      cc: `eventNn`,
      insertValue: event => event.nn,
      updateValue: null,
    },
    author_id: {
      cc: `authorId`,
      insertValue: event => event.authorId,
      updateValue: null,
    },
    text: {
      cc: `text`,
      insertValue: event => event.payload.text ?? null,
      updateValue: p => p.text,
    },
    reply_to_nn: {
      cc: `replyToNn`,
      insertValue: event => event.payload.replyToNn ?? null,
      updateValue: p => p.replyToNn,
    },
    attachments: {
      cc: `attachments`,
      insertValue: event => event.payload.attachments?.map(mapAttachmentToDb) ?? null,
      updateValue: p => p.attachments?.map(mapAttachmentToDb),
    },
    forwarded: {
      cc: `forwarded`,
      insertValue: event => event.payload.forwarded?.map(mapForwardToDb) ?? null,
      updateValue: p => p.forwarded?.map(mapForwardToDb),
    },
    created_at: {
      cc: `createdAt`,
      insertValue: event => event.createdAt,
      updateValue: null,
    },
    edited_at: {
      cc: `editedAt`,
      insertValue: () => null,
      updateValue: (p, context) => context.latestEventTime,
    },
    updated_at: {
      cc: 'updatedAt',
      insertValue: () => new Date().toISOString(),
      updateValue: () => new Date().toISOString(),
    },
    edited_nn: {
      cc: 'editedNn',
      insertValue: () => null,
      updateValue: (p, context) => context.latestEventNn,
    },
  } satisfies Record<
    string,
    {
      cc: string;
      insertValue: (event: MessageEventDto, nn: bigint) => ExtendedJsonValue;
      updateValue: ((p: MessageEventDto[`payload`], extra: UpdateContext) => ExtendedJsonValue) | null;
    }
  >;

  const cc2sc = new Map(Object.entries(mapper).map(([sc, { cc }]) => [cc, sc]));
  const sc2cc = new Map(Object.entries(mapper).map(([sc, { cc }]) => [sc, cc]));
  const updateableFields = new Map(
    Object.entries(mapper)
      .map(([key, sc]) => sc.updateValue && ([key, sc.updateValue] as const))
      .filter(isDefined)
  );

  return { mapper, cc2sc, sc2cc, updateableFields };
})();

// A custom error class to signal an LWT failure for the retry logic.
export class LwtError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LwtError';
  }
}

/**
 * Maps the ForwardInfoDto from the event to the snake_case format for ScyllaDB.
 */
const mapForwardToDb = (forward: ForwardInfoDto) => ({
  chat_id: forward.chatId,
  nn: forward.nn,
  text: forward.text,
  author_id: forward.authorId,
  created_at: forward.createdAt,
  attachments: forward.attachments?.map(mapAttachmentToDb),
});

type SelectedMessage<S extends Partial<Record<keyof MessageDto, boolean>>> = Pick<
  MessageDto,
  {
    [K in keyof S & keyof MessageDto]: S[K] extends true ? K : never;
  }[keyof S & keyof MessageDto]
>;

@Injectable()
export class MessagesDb {
  constructor(private readonly scyllaService: ScyllaService) {}

  readonly insert = (() => {
    // 1. Define the mapping from DTO to DB columns.
    const { mapper } = messagesDbInfo;

    // 2. Pre-calculate the static parts of the query string.
    const columns = Object.keys(mapper);
    const query = `INSERT INTO poslah.messages (${columns.join(',')}) VALUES (${Array(columns.length).fill('?').join(',')})`;

    // Extract the value-generating functions in the correct order.
    const paramExtractors = Object.values(mapper).map(m => m.insertValue);

    // 3. The IIFE returns the final function that generates the query and params.
    return (event: MessageEventDto, nn: bigint) =>
      this.scyllaService.execute(
        query,
        paramExtractors.map(extractor => extractor(event, nn)),
        { prepare: true }
      );
  })();

  async getState(chatId: string, nn: bigint) {
    return (
      await this.scyllaService.execute(
        `SELECT edited_nn FROM poslah.messages WHERE chat_id = ? AND nn = ?`,
        [chatId, nn],
        { prepare: true }
      )
    ).rows
      .slice(0, 1)
      .map(v => ({
        editedNn: v.get(0) as bigint,
      }))
      .at(0);
  }

  /**
   * Builds a dynamic, alphabetically sorted CQL UPDATE statement for a message patch.
   * This is a pure function that returns the query string and its parameters.
   * @param chatId The ID of the chat.
   * @param targetMessageNn The `nn` of the message to be updated.
   * @param finalPatch The final, reconstructed payload object.
   * @param latestEventTime The timestamp from the latest event being applied.
   * @param latestEventNn The `nn` of the latest event being applied.
   * @param ifConditionNn The `edited_nn` value that was read from the DB, used for the LWT `IF` condition.
   * @returns An object containing the CQL query string and the parameters for execution.
   */
  async update(
    {
      chatId,
      targetMessageNn,
      ifConditionNn,
    }: {
      chatId: string;
      targetMessageNn: bigint;
      ifConditionNn: bigint | null;
    },
    finalPatch: MessageEventDto['payload'],
    latestEventTime: Date,
    latestEventNn: bigint
  ) {
    const columns: string[] = [];
    const params: ExtendedJsonValue[] = [];

    const context: UpdateContext = { latestEventTime, latestEventNn };
    for (const [columnName, updateValueFn] of messagesDbInfo.updateableFields.entries()) {
      const value = updateValueFn(finalPatch, context);

      if (value !== undefined) {
        const index = sortedIndex(columns, columnName);
        columns.splice(index, 0, columnName);
        params.splice(index, 0, value);
      }
    }

    return params.length > 0
      ? await this.scyllaService.execute(
          `UPDATE poslah.messages SET ${columns.map(c => `${c} = ?`).join(', ')} WHERE chat_id = ? AND nn = ? IF edited_nn = ?`,
          [...params, chatId, targetMessageNn, ifConditionNn],
          { prepare: true }
        )
      : null;
  }

  /**
   * Fetches a single message from ScyllaDB by its primary key.
   */
  async get<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    nn: bigint,
    select?: S
  ): Promise<SelectedMessage<S> | null> {
    const columns = (
      select
        ? Object.keys(select)
            .map(key => select[key as keyof MessageDto] && messagesDbInfo.cc2sc.get(key))
            .filter(isTruthy)
        : [...messagesDbInfo.sc2cc.keys()]
    ).sort();

    const row = (
      await this.scyllaService.execute(
        `SELECT ${columns.length > 0 ? columns.join(', ') : 'null'} FROM poslah.messages WHERE chat_id = ? AND nn = ?`,
        [chatId, nn],
        { prepare: true }
      )
    ).first();
    return row ? (mapMessageFromDb(row as Partial<MessageDbRow>) as SelectedMessage<S>) : null;
  }
}
