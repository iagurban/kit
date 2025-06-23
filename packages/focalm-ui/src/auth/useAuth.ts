import type { CurrentUserJwtPayload } from '@focalm/server/exports';
import { computed } from 'mobx';
import { useMemo } from 'react';

import { tokenStore } from '../providers/urql-provider';

export const getAuth = () => tokenStore.user;

export const useAuth = (): CurrentUserJwtPayload | null => {
  return useMemo(() => computed(() => getAuth()), []).get();
};
