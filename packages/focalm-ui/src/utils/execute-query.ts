import { sleep } from '@freyja/kit/utils/async-utils';
import {
  AnyVariables,
  Client,
  DocumentInput,
  OperationContext,
  OperationResult,
  OperationResultSource,
} from 'urql';

import { PromiseWithCancel } from './requester';

const prepareOperationResultSource = <Data, Variables extends AnyVariables>(
  source: OperationResultSource<OperationResult<Data, Variables>>
) =>
  source.toPromise().then(result => {
    if (result.error) {
      throw result.error;
    }
    if (!result.data) {
      throw new Error(`no data`);
    }
    return result.data;
  });

export const executeMutation = <Data, Variables extends AnyVariables>(
  client: Client,
  query: DocumentInput<Data, Variables>,
  variables: Variables,
  context?: Partial<OperationContext>
): PromiseWithCancel<Data> => ({
  promise: prepareOperationResultSource(client.mutation<Data, Variables>(query, variables, context)),
  cancel: () => {
    throw new Error(`can not cancel mutation`);
  },
});

export const executeQuery = <Data, Variables extends AnyVariables>(
  client: Client,
  query: DocumentInput<Data, Variables>,
  variables: Variables,
  context?: Partial<OperationContext>
): PromiseWithCancel<Data> & {
  update<T>(fn: (p: Promise<Data>) => Promise<T>): { promise: Promise<T>; cancel: (() => void) | undefined };
} => {
  const ac = new AbortController();
  return {
    promise: prepareOperationResultSource(
      client.query<Data, Variables>(query, variables, {
        ...context,
        fetchOptions: { ...context?.fetchOptions, signal: ac.signal },
      })
    ).catch(async e => {
      await sleep(1000);
      throw e;
    }),
    cancel: () => {
      ac.abort(`canceled by user`);
    },
    update<T>(fn: (p: Promise<Data>) => Promise<T>) {
      return {
        promise: fn(this.promise),
        cancel: this.cancel,
      };
    },
  };
};
