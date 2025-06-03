import { api } from './util';

export const requestRefreshAuthToken = async () => {
  const res = await api(`auth/refresh`, { method: 'POST' });
  if (res.ok) {
    const { access_token: token } = await res.json();
    if (token && typeof token === `string`) {
      return token;
    }
  }
  return null;
};
