import { authExchange } from '@urql/exchange-auth';
import { retryExchange } from '@urql/exchange-retry';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useMemo } from 'react';
import { createClient, fetchExchange, Provider } from 'urql';

import { requestRefreshAuthToken } from './requests/request-refresh-auth-token';

class TokenStore {
  constructor() {
    makeObservable(this);

    if (window.__initialAccessToken) {
      this.refreshing = window.__initialAccessToken.then(token => {
        this.set(token);
        return token;
      });
      delete window.__initialAccessToken;
    }
  }

  @observable
  private accessToken: string | null = null;
  @observable.ref
  private refreshing: Promise<string | null> | null = null;

  get() {
    return this.accessToken;
  }
  @action set(token: string | null) {
    this.accessToken = token;
  }
  @action
  clear() {
    this.accessToken = null;
  }
  @action
  async refresh(): Promise<string | null> {
    if (this.refreshing) {
      return this.refreshing;
    }

    this.refreshing = (async () => {
      try {
        const token = await requestRefreshAuthToken();
        if (token) {
          this.set(token);
          return token;
        }
      } catch {
        // go to clear and return
      }
      this.clear();
      return null;
    })();

    return this.refreshing;
  }
}

export const tokenStore = new TokenStore();

const client = () =>
  createClient({
    url: import.meta.env.VITE_GRAPHQL_URL,
    fetchOptions: () => ({
      credentials: 'include', // <==== вот это критично!
    }),
    exchanges: [
      retryExchange({
        // сколько миллисекунд ждать перед первой повторной попыткой:
        initialDelayMs: 1000,
        // максимальная задержка между попытками:
        maxDelayMs: 10000,
        // включить случайную флуктуацию задержки (джиттер):
        randomDelay: true,
        // сколько всего раз (помимо первой) пытаться повторить:
        maxNumberAttempts: 3,
        // по каким ошибкам повторять (по умолчанию — только сетевые)
        retryIf: (error, _operation) =>
          Boolean(error.networkError) || error.graphQLErrors.some(e => e.message === 'Internal Server Error'),
      }),
      authExchange(async utils => {
        return {
          // 1. Проверяем, была ли auth ошибка
          didAuthError: error => (
            console.log(error), error.graphQLErrors.some(e => e.extensions?.['code'] === 'UNAUTHENTICATED')
          ),

          // 2. Устанавливаем заголовок
          addAuthToOperation: operation => {
            const token = tokenStore.get();
            return token ? utils.appendHeaders(operation, { Authorization: `Bearer ${token}` }) : operation;
          },

          // 3. Логика обновления токена
          refreshAuth: async () => void (await tokenStore.refresh()),
        };
      }),
      fetchExchange,
    ],
  });

export const UrqlProvider = observer<PropsWithChildren>(function UrlqProvider({ children }) {
  const c = useMemo(() => client(), []);
  return <Provider value={c}>{children}</Provider>;
});
