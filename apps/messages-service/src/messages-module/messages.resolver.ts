import { isDefined, isROArray, isTruthy } from '@gurban/kit/core/checks';
import {
  findGqlNodeByPath,
  flattenSpreads,
  GqlASTField,
  GqlASTFragmentDefinition,
  GqlASTFragmentSpread,
} from '@gurban/kit/nest/decorators/prisma-selection.decorator';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Args, GqlExecutionContext, Int, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { Message } from './message.entity';
import { MessagesService } from './messages.service';

type ShallowSelect = { [key: string]: boolean };

const collectShallowSelection = (
  fields: readonly (GqlASTField | GqlASTFragmentSpread)[] | undefined,
  path: string,
  skip: Set<string> | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>
): ShallowSelect =>
  fields?.length
    ? Object.fromEntries(
        flattenSpreads(fields, fragments)
          .map(f => {
            const subPath = [path, f.name.value].filter(isTruthy).join(`.`);
            return skip?.has(subPath) ? undefined : ([f.name.value, true] as const);
          })
          .filter(isDefined)
      )
    : {};

type ScyllaDecoratorArgs = { path?: readonly string[]; skip?: readonly string[] };

export const getScyllaSelectionFromInfo = (
  {
    fieldName,
    fieldNodes: [fieldNode],
    fragments,
  }: { fieldName: string; fieldNodes: GqlASTField[]; fragments: Record<string, GqlASTFragmentDefinition> },
  opts?: readonly string[] | ScyllaDecoratorArgs | undefined
) => {
  // console.log(`opts`, opts);

  const { path, skip } = isROArray(opts) ? { path: opts } : (opts ?? {});

  const skipSet = skip && new Set(skip);

  const root = path?.length ? findGqlNodeByPath(path, fieldNode, fragments) : fieldNode;
  if (!root) {
    throw new Error(`Path "${path?.join(`.`)}" not found in ${fieldName}`);
  }

  return collectShallowSelection(root.selectionSet?.selections, path?.join(`.`) || ``, skipSet, fragments);
};

const scyllaSelectionFromGqlExecutionCtx = (
  ctx: GqlExecutionContext,
  opts: readonly string[] | ScyllaDecoratorArgs | undefined
) => {
  return getScyllaSelectionFromInfo(ctx.getInfo(), opts);
};

export const ScyllaSelection = createParamDecorator(
  (opts: readonly string[] | ScyllaDecoratorArgs | undefined, context: ExecutionContext) =>
    scyllaSelectionFromGqlExecutionCtx(GqlExecutionContext.create(context), opts)
);

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Query(() => [Message])
  getMessages(
    @Args('chatId', { type: () => String })
    chatId: string,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 30 })
    limit: number,
    @Args('lt', {
      type: () => BigInt,
      nullable: true,
      description: 'Less than. Fetches messages older than this nn.',
    })
    lt?: bigint,
    @Args('gt', {
      type: () => BigInt,
      nullable: true,
      description: 'Greater than. Fetches messages newer than this nn.',
    })
    gt?: bigint,
    @ScyllaSelection()
    selection?: Record<string, boolean>
  ) {
    if (lt && gt) {
      throw new GraphQLError('Only one of `lt` or `gt` can be provided.', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    if (lt) {
      return this.messagesService.getMessagesOlderThanNn(chatId, lt, limit, selection);
    }

    if (gt) {
      return this.messagesService.getMessagesNewerThanNn(chatId, gt, limit, selection);
    }

    return this.messagesService.getLatestMessages(chatId, limit, selection);
  }
}
