import { isDefined } from '@gurban/kit/core/checks';

export const parseCookies = (s: string) =>
  Object.fromEntries(
    s
      .split('; ')
      .map(
        s =>
          s
            .match(/^([^=]+)=(.*)$/)
            ?.slice(1, 3)
            .map(s => decodeURIComponent(s)) as [string, string]
      )
      .filter(isDefined)
  );
