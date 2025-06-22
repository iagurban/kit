import { once } from '../core/once';

export class Pows {
  constructor(
    readonly base: bigint,
    initDigits = 20
  ) {
    if (base < 2n) {
      throw new Error('mapping length must be > 1');
    }
    this.get(Math.max(1, initDigits) - 1);
  }

  get(pos: number): bigint {
    let n = this.pows.length - 1;
    while (pos > n++) {
      this.pows.push(this.base * this.pows[this.pows.length - 1]);
    }
    return this.pows[pos];
  }

  private readonly pows: bigint[] = [1n];
}

export class NumberConverter {
  constructor(readonly parts: readonly (string | readonly [string, string])[]) {}

  get base(): bigint {
    return BigInt(this.digits.length);
  }

  @once
  get digits(): readonly number[] {
    const r: number[] = [];
    for (const e of this.parts) {
      if (Array.isArray(e)) {
        if (e.length !== 2 || e[0].length !== 1 || e[1].length !== 1) {
          throw new Error('fskdfjgksj');
        }
        const [from, to] = Array.from(e).map(s => s.charCodeAt(0));
        if (from > to) {
          throw new Error('sfldhgsjfgk');
        }
        r.push(...Array.from({ length: to - from + 1 }, (_, i) => from + i));
      } else {
        r.push(...Array.from(e).map(s => s.charCodeAt(0)));
      }
    }
    if (new Set(r).size !== r.length) {
      throw new Error('duplicates');
    }
    return r;
  }

  @once
  get pows(): Pows {
    return new Pows(this.base);
  }

  @once
  get byChar(): Map<number, bigint> {
    return new Map(this.digits.map((cc, i) => [cc, BigInt(i)] as const));
  }

  readonly from10 = (input: string | number | bigint): string => {
    if (typeof input === 'number' && Math.floor(input) !== input) {
      throw new Error(`n is floating ${input}`);
    }
    let n = BigInt(input);
    if (n < 0n) {
      throw new Error(`n is negative: ${n}`);
    }
    const { base: b, digits } = this;
    if (b === 10n) {
      throw new Error('mapping length must be != 10');
    }
    const r: number[] = [];
    do {
      r.push(digits[Number(n % b)]);
      n /= b;
    } while (n > 0n);
    return String.fromCharCode(...r.reverse());
  };

  readonly to10 = (n: string): bigint => {
    const { byChar, pows } = this;
    let r = 0n;
    for (let i = n.length - 1; i >= 0; --i) {
      const v = byChar.get(n.charCodeAt(i));
      if (v === undefined) {
        throw new Error(`invalid char '${n[i]}' in '${n}'`);
      }
      r += v * pows.get(n.length - 1 - i);
    }
    return r;
  };

  readonly mask = (length: number) => {
    const c = this.digits[this.digits.length - 1];
    return String.fromCharCode(...Array.from({ length }, () => c));
  };

  readonly random = (length: number): string => {
    if (length < 1 || Math.floor(length) !== length) {
      throw new Error(`random length must be integer > 0, got ${length}`);
    }
    return String.fromCharCode(
      ...Array.from({ length }, () => this.digits[(Math.random() * this.digits.length) | 0])
    );
  };

  @once
  get maxSafeDigits() {
    return this.from10(BigInt(Number.MAX_SAFE_INTEGER)).length - 1;
  }

  readonly fixedWidthRandomGenerator = (length: number) => {
    const gen = (mask: number, width: number, pad: string) =>
      this.from10(Math.floor(Math.random() * mask)).padStart(width, pad);

    const genRepeat = (n: number, mask: number, width: number, pad: string) => {
      const r: string[] = [];
      for (let i = 0; i < n; ++i) {
        r.push(gen(mask, width, pad));
      }
      return r.join('');
    };

    if (length < 1 || Math.floor(length) !== length) {
      throw new Error(`length must be integer < 1, got ${length}`);
    }

    const pad = String.fromCharCode(this.digits[0]);

    const mask0Digits = this.maxSafeDigits;
    const mask0 = Number(this.to10(this.mask(mask0Digits)));

    const mask1Digits = length % mask0Digits;
    const mask1 = Number(this.to10(this.mask(mask1Digits)));

    const mask0Count = Math.floor(length / mask0Digits);

    if (mask0Count < 1) {
      return () => gen(mask1, length, pad);
    }
    if (mask1Digits < 1) {
      return () => genRepeat(mask0Count, mask0, mask0Digits, pad);
    }
    return () => `${genRepeat(mask0Count, mask0, mask0Digits, pad)}${gen(mask1, mask1Digits, pad)}`;
  };
}
