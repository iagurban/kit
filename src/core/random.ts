/**
 * Generates cryptographically secure random bytes.
 * Works in Browsers (Web Crypto API) and Node.js (Legacy & Modern).
 * * @param {number} length - Number of bytes
 * @returns {Uint8Array|Buffer}
 */
export const getRandomBytes: ((length: number) => Uint8Array | Buffer) & {
  hex: (length: number) => string;
} = globalThis.crypto?.getRandomValues
  ? (() => {
      const randomBytes = (length: number) => {
        const buf = new Uint8Array(length);
        globalThis.crypto.getRandomValues(buf);
        return buf;
      };

      return Object.assign(randomBytes, {
        hex: (length: number) => {
          return Array.from(randomBytes(length))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        },
      });
    })()
  : (crypto =>
      Object.assign((length: number) => crypto.randomBytes(length), {
        hex: (length: number) => {
          return crypto.randomBytes(length).toString('hex');
        },
      }))(
      typeof require === 'function'
        ? // eslint-disable-next-line @typescript-eslint/no-require-imports
          require('crypto')
        : /* istanbul ignore next */ {
            randomBytes: Object.assign(
              /* istanbul ignore next */ () => {
                throw new Error('Secure random generation not supported');
              },
              {
                hex: /* istanbul ignore next */ () => {
                  throw new Error('Secure random generation not supported');
                },
              }
            ),
          }
    );
