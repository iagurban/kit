import type {} from 'jest';

describe('getRandomBytes', () => {
  const origCrypto = globalThis.crypto as any;

  afterEach(() => {
    // Restore environment and module state
    jest.resetModules();
    jest.dontMock('crypto');
    globalThis.crypto = origCrypto;
  });

  it('uses Web Crypto API when available and returns deterministic hex in test', () => {
    // Arrange: fake browser crypto.getRandomValues
    // Fill buffer with 0,1,2,... for deterministic assertions
    globalThis.crypto = {
      getRandomValues: (buf: Uint8Array) => {
        for (let i = 0; i < buf.length; i++) {
          buf[i] = i & 0xff;
        }
        return buf;
      },
    } as Crypto;

    jest.isolateModules(() => {
      // Act

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { getRandomBytes } = require('./random') as typeof import('./random');
      const bytes = getRandomBytes(4);
      const hex = getRandomBytes.hex(4);

      // Assert
      expect(bytes).toBeInstanceOf(Uint8Array);
      expect([...bytes]).toEqual([0, 1, 2, 3]);
      expect(hex).toBe('00010203');
    });
  });

  it('falls back to Node crypto.randomBytes when Web Crypto is not available', () => {
    // Arrange: remove web crypto and mock Node crypto module
    // @ts-expect-error clear
    globalThis.crypto = undefined;

    // Always return Buffer filled with 0xAB for determinism
    jest.doMock('crypto', () => ({
      randomBytes: (len: number) => Buffer.alloc(len, 0xab),
    }));

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { getRandomBytes } = require('./random') as typeof import('./random');
      const bytes = getRandomBytes(3);
      const hex = getRandomBytes.hex(3);

      // In Node path, implementation returns Buffer directly
      expect(Buffer.isBuffer(bytes)).toBe(true);
      expect([...bytes]).toEqual([0xab, 0xab, 0xab]);
      expect(hex).toBe('ababab');
    });
  });
});
