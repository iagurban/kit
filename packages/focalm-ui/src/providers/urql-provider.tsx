import type { CurrentUserJwtPayload } from '@focalm/server/modules/auth/auth.service';
import { authExchange } from '@urql/exchange-auth';
import { retryExchange } from '@urql/exchange-retry';
import { jwtDecode } from 'jwt-decode';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useMemo } from 'react';
import { createClient, fetchExchange, Provider } from 'urql';

import { requestRefreshAuthToken } from '../requests/request-refresh-auth-token';

const getUserFromToken = (token: string) => {
  try {
    return jwtDecode<CurrentUserJwtPayload>(token);
  } catch {
    return null;
  }
};

class TokenStore {
  constructor() {
    makeObservable(this);

    if (window.__initialAccessToken) {
      this.refreshing = window.__initialAccessToken
        .then(token => {
          this.set(token);
          return token;
        })
        .finally(this.onFinished);
      delete window.__initialAccessToken;
    }
  }

  @observable
  private accessToken: string | null = null;
  @observable.ref
  private refreshing: Promise<string | null> | null = null;

  @observable
  user: CurrentUserJwtPayload | null = null;

  get() {
    return this.accessToken;
  }
  @action set(token: string | null) {
    // console.log(`setting access token to ${token}`);

    this.accessToken = token;

    const upd = token ? getUserFromToken(token) : null;
    if (upd) {
      if (!this.user || upd.sub !== this.user.sub) {
        this.user = upd;
      } else {
        Object.assign(this.user, upd);
      }
    } else {
      this.user = null;
    }
  }
  @action
  clear() {
    this.set(null);
  }
  @action
  async refresh(): Promise<string | null> {
    if (this.refreshing) {
      return this.refreshing;
    }

    return (this.refreshing = (async () => {
      try {
        const token = await requestRefreshAuthToken();
        if (token) {
          this.set(token);
          return token;
        }
      } catch (e) {
        console.error(`refresh auth token failed`, e);
        // go to clear and return
      } finally {
        this.onFinished();
      }
      this.clear();
      return null;
    })());
  }

  @action.bound
  private onFinished() {
    this.refreshing = null;
  }
}

export const tokenStore = new TokenStore();

const client = () =>
  createClient({
    url: import.meta.env.VITE_GRAPHQL_URL,
    fetchOptions: () => ({
      credentials: 'include', // критично!
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
          didAuthError: error => error.graphQLErrors.some(e => e.extensions?.['code'] === 'UNAUTHENTICATED'),

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
