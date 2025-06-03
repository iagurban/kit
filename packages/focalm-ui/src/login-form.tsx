import { Button, Input } from '@mantine/core';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useLoginMutation } from './graphql.generated/auth';
import { tokenStore } from './urql-provider';

export const LoginForm = observer(function LoginForm() {
  const store = useMemo(
    () =>
      makeAutoObservable({
        login: `admin`,
        setLogin(login: string) {
          this.login = login;
        },
        password: `pass`,
        setPassword(password: string) {
          this.password = password;
        },
      }),
    []
  );
  const [, login] = useLoginMutation();

  return (
    <>
      <Input.Wrapper label="Username or e-mail">
        <Input value={store.login} onChange={e => store.setLogin(e.target.value)} />
      </Input.Wrapper>
      <Input.Wrapper label="Password">
        <Input value={store.password} onChange={e => store.setPassword(e.target.value)} type="password" />
      </Input.Wrapper>
      <Button
        onClick={() => {
          void (async () => {
            const r = await login({ login: store.login, password: store.password });
            if (r.data?.accessToken) {
              tokenStore.set(r.data.accessToken);
            }
          })();
        }}
      >
        Login
      </Button>
    </>
  );
});
