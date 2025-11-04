import { isDefined, isInteger, isTruthy } from '@gurban/kit/core/checks';
import { ExtendedJsonValue } from '@gurban/kit/core/json-type';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { Injectable } from '@nestjs/common';
import { ScyllaService } from '@poslah/util/modules/nosql/scylla/scylla.service';
import { AttachmentInfoDto, ForwardInfoDto, MessageDto } from '@poslah/util/schemas/message.schema';
import { MessageEventDto } from '@poslah/util/schemas/some-message-event-schema';
import { types } from 'cassandra-driver';
import { sortedIndex, sortedLastIndexBy } from 'lodash';
import long from 'long';

import { MessagesCacheService } from './messages-cache.service';

// cassandra driver uses an old Long library, which have no method to convert to BigInt.
// closing eyes and crossing ourselves, call this method on the old object.
const longToBigIntMethod = notNull(long.prototype.toBigInt) satisfies () => bigint;

const scyllaLongToBigint = (l: long) => longToBigIntMethod.call(l);
const scyllaLongFromBigint = (n: bigint) => long.fromBigInt(n);

const scyllaUuidToString = (uuid: types.Uuid) => uuid.toString();
const scyllaUuidFromString = (uuid: string) => types.Uuid.fromString(uuid);

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
  chat_id: scyllaUuidFromString(messageDto.chatId),
  nn: scyllaLongFromBigint(messageDto.nn),
  event_nn: messageDto.eventNn != null ? scyllaLongFromBigint(messageDto.eventNn) : null,
  author_id: scyllaUuidFromString(messageDto.authorId),
  text: messageDto.text,
  reply_to_nn: messageDto.replyToNn != null ? scyllaLongFromBigint(messageDto.replyToNn) : null,
  attachments: messageDto.attachments?.map(mapAttachmentToDb) ?? null,
  forwarded: messageDto.forwarded?.map(mapForwardToDb) ?? null,
  created_at: messageDto.createdAt,
  updated_at: messageDto.updatedAt,
  edited_at: messageDto.editedAt,
  edited_nn: messageDto.editedNn,
  deleted_at: messageDto.deletedAt ?? null,
});

type MessageDbRow = ReturnType<typeof mapMessageToDb>;
export const mapMessageFromDb = (dbRow: Partial<MessageDbRow>): Partial<MessageDto> => ({
  chatId: dbRow.chat_id ? scyllaUuidToString(dbRow.chat_id) : undefined,
  nn: dbRow.nn != null ? scyllaLongToBigint(dbRow.nn) : undefined,
  eventNn: dbRow.event_nn != null ? scyllaLongToBigint(dbRow.event_nn) : undefined,
  authorId: dbRow.author_id ? scyllaUuidToString(dbRow.author_id) : undefined,
  text: dbRow.text,
  replyToNn: dbRow.reply_to_nn != null ? scyllaLongToBigint(dbRow.reply_to_nn) : null,
  attachments: dbRow.attachments?.map(mapAttachmentFromDb) ?? null,
  forwarded: dbRow.forwarded?.map(mapForwardFromDb) ?? null,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at,
  editedAt: dbRow.edited_at,
  editedNn: dbRow.edited_nn,
  deletedAt: dbRow.deleted_at,
});

interface UpdateContext {
  latestEventTime: Date;
  latestEventNn: bigint;
}
//

const messagesDbInfo = (() => {
  const mapper = {
    chat_id: {
      cc: `chatId`,
      insertValue: event => event.chatId,
      updateValue: null,
    },
    nn: {
      cc: `nn`,
      insertValue: (_event, nn) => nn.toString(),
      updateValue: null,
    },
    event_nn: {
      cc: `eventNn`,
      insertValue: event => event.nn.toString(),
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
      insertValue: event => event.payload.replyToNn?.toString() ?? null,
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
      updateValue: (_p, context) => context.latestEventTime,
    },
    deleted_at: {
      cc: `deletedAt`,
      insertValue: () => null,
      updateValue: p => p.deletedAt,
    },
    updated_at: {
      cc: 'updatedAt',
      insertValue: () => new Date().toISOString(),
      updateValue: () => new Date().toISOString(),
    },
    edited_nn: {
      cc: 'editedNn',
      insertValue: () => null,
      updateValue: (_p, context) => context.latestEventNn,
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

type SelectedMessage<S extends Partial<Record<keyof MessageDto, boolean>>> = Pick<
  MessageDto,
  {
    [K in keyof S & keyof MessageDto]: S[K] extends true ? K : never;
  }[keyof S & keyof MessageDto]
>;

const checkLimit = (limit: number, maxLimit: number) => {
  if (limit < 1 || !isInteger(limit)) {
    throw new Error(`limit must be at least 1`);
  } else if (limit > maxLimit) {
    throw new Error(`limit must be at most ${maxLimit}, got: ${limit}`);
  }
};

@Injectable()
export class MessagesRepository {
  static readonly maxSerialLimit = 100;
  static readonly maxIndividualLimit = 100;

  constructor(
    private readonly scyllaService: ScyllaService,
    private readonly redisService: MessagesCacheService
  ) {}

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
        [chatId, nn.toString()],
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
        params.splice(index, 0, value ?? null);
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

  private columnsClause<S extends Partial<Record<keyof MessageDto, boolean>>>(select?: S | `*`) {
    if (select === `*`) {
      return [...messagesDbInfo.sc2cc.keys()].join(', ');
    }
    const extendedSelect = { ...select, nn: true };
    const columns = Object.keys(extendedSelect)
      .map(key => extendedSelect[key as keyof MessageDto] && messagesDbInfo.cc2sc.get(key))
      .filter(isTruthy)
      .sort();

    return columns.length > 0 ? columns.join(', ') : 'null';
  }

  /**
   * Fetches messages of a chat from ScyllaDB by theirs Nn.
   */
  async getByNn<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    nn: readonly bigint[],
    select?: S | `*`
  ): Promise<SelectedMessage<S>[]> {
    checkLimit(nn.length, MessagesRepository.maxIndividualLimit);

    const nnSet = new Set(nn.map(s => s.toString()));
    if (nnSet.size === 0) {
      return [];
    }
    const { rows } = await this.scyllaService.execute(
      `SELECT ${this.columnsClause(select)} FROM poslah.messages WHERE chat_id = ? AND nn ${nnSet.size > 1 ? 'IN' : '='} ?`,
      [chatId, nnSet.size > 1 ? [...nnSet] : (nnSet.values().next().value ?? null)],
      { prepare: true }
    );

    return rows.map(row => mapMessageFromDb(row as Partial<MessageDbRow>) as SelectedMessage<S>);
  }

  private async takeMessagesOlderThan(chatId: string, nn: bigint, limit: number, columnsClause: string) {
    checkLimit(limit, MessagesRepository.maxSerialLimit);
    return (
      await this.scyllaService.execute(
        `SELECT ${columnsClause} FROM poslah.messages WHERE chat_id = ? AND nn < ? ORDER BY nn DESC LIMIT ?`,
        [chatId, nn.toString(), limit],
        { prepare: true }
      )
    ).rows.reverse() as Partial<MessageDbRow>[];
  }

  private async takeLatestMessages(chatId: string, limit: number, columnsClause: string) {
    checkLimit(limit, MessagesRepository.maxSerialLimit);
    return (
      await this.scyllaService.execute(
        `SELECT ${columnsClause} FROM poslah.messages WHERE chat_id = ? ORDER BY nn DESC LIMIT ?`,
        [chatId, limit],
        { prepare: true }
      )
    ).rows.reverse() as Partial<MessageDbRow>[];
  }

  async getLatestMessages<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    limit: number,
    select?: S
  ) {
    return (await this.takeLatestMessages(chatId, limit, this.columnsClause(select))).map(
      row => mapMessageFromDb(row) as SelectedMessage<S>
    );
  }

  async getMessagesOlderThanNn<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    nn: bigint,
    limit: number,
    select?: S
  ) {
    return (await this.takeMessagesOlderThan(chatId, nn, limit, this.columnsClause(select))).map(
      row => mapMessageFromDb(row) as SelectedMessage<S>
    );
  }

  async getMessagesNewerThanNn<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    nn: bigint,
    limit: number,
    select?: S
  ) {
    const columnsClause = this.columnsClause(select);

    // all default values are 0, which aligns with the following logic.
    const { totalCount, deletedCount, latestChatNn } = await this.redisService.getChatSyncMetadata(chatId);

    const countToEnd = latestChatNn - nn;
    const isNearEnd = countToEnd < BigInt(limit);

    // minimal nn which must be included in the result (it is ok if it doesn't exist in the DB)
    const minimalNn = nn + 1n;

    // predicting how many extra elements need to fetch to "cover" the gaps of deleted messages
    const multiplier = totalCount === 0 ? 1 : 1 + deletedCount / totalCount;

    const shift = Math.ceil(limit * multiplier);
    const extendedLimit = Math.ceil(shift * multiplier);

    const results = [
      ...(isNearEnd
        ? await this.takeLatestMessages(
            chatId,
            Math.ceil(Math.max(2, Number(countToEnd)) * multiplier),
            columnsClause
          )
        : await this.takeMessagesOlderThan(chatId, nn + BigInt(shift), extendedLimit, columnsClause)),
    ];
    if (results.length >= extendedLimit /* has more */) {
      for (;;) {
        const lowerLong = notNull(results.at(0)!.nn);
        const lower = scyllaLongToBigint(lowerLong);
        if (lower <= minimalNn) {
          break;
        }
        // lower > minimalNn - need to fetch more, from "lower" do older
        const addLimit = Math.max(2, Math.ceil(Number(BigInt(lower) - minimalNn) * multiplier));
        const addRows = await this.takeMessagesOlderThan(chatId, lower, addLimit, columnsClause);
        results.unshift(...addRows);
        if (addRows.length < addLimit /* doesn't have more */) {
          break;
        }
      }
    }

    const start = sortedLastIndexBy(results, { nn: scyllaLongFromBigint(nn) }, r => notNull(r.nn));
    return results
      .slice(start, start + limit) // will be empty if startIndex === results.length
      .map(row => mapMessageFromDb(row) as SelectedMessage<S>);
  }
}
