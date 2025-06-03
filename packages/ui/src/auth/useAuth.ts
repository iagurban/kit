import type { CurrentUserJwtPayload } from '@jelovnik/server/exports';
import { jwtDecode } from 'jwt-decode';
import { computed, IComputedValue } from 'mobx';
import { useMemo } from 'react';

import { tokenStore } from '../urql-provider';

const getUserFromToken = (token: string) => {
  try {
    return jwtDecode<CurrentUserJwtPayload>(token);
  } catch {
    return null;
  }
};

export const useAuthCmptd = (): IComputedValue<CurrentUserJwtPayload | null> => {
  return useMemo(
    () =>
      computed(() => {
        const token = tokenStore.get();
        return token ? getUserFromToken(token) : null;
      }),
    []
  );
};

export const useAuth = (): CurrentUserJwtPayload | null => {
  return useAuthCmptd().get();
};
