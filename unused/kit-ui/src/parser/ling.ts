import { notNull } from '@gurban/kit/utils/flow-utils.ts';

export const buildWithOddMask = (parts: string[], mask: number) => {
  const count = Math.ceil(parts.length / 2);
  const b: string[] = [];
  for (let i = 0; i < count; ++i) {
    const offset = i * 2;
    b.push(parts[offset]);
    if (mask & (1 << i)) {
      b.push(parts[offset + 1]);
    }
  }
  return b.join('');
};

export const wordWithBracesParser = (() => {
  type ParserConfig = {
    stop: number;
    found: (part: string, parts: string[]) => void;
    end: (part: string, parts: string[]) => void;
    next: () => ParserConfig;
  };

  type Parser = () => Parser | null;

  const parser =
    (start: number, s: string, parts: string[], { found, end, next, stop }: ParserConfig): Parser =>
    () => {
      for (let i = start; ; ++i) {
        const c = s.codePointAt(i);
        if (c === undefined) {
          end(s.slice(start, i), parts);
          return null;
        }
        if (c === stop) {
          found(s.slice(start, i), parts);
          return parser(++i, s, parts, next());
        }
      }
    };

  const parsers: Record<'n' | 'p', ParserConfig> = {
    n: {
      stop: notNull('('.codePointAt(0)),
      found: (s, parts) => {
        if (parts.length > 1 && !parts[parts.length - 1]) {
          parts.splice(-2, 2, parts[parts.length - 2] + s);
        } else {
          parts.push(s);
        }
      },
      end: (s, parts) => s && parts.push(s),
      next: () => parsers.p,
    },
    p: {
      stop: notNull(')'.codePointAt(0)),
      found: (s, parts) => parts.push(s),
      end: (s, parts) =>
        parts.length ? (parts[parts.length - 1] = parts[parts.length - 1] + '(' + s) : parts.push(s),
      next: () => parsers.n,
    },
  };

  return (s: string) => {
    const parts: string[] = [];
    let p: Parser | null = parser(0, s, parts, parsers.n);
    while (p) {
      p = p();
    }
    return parts;
  };
})();

export const wordWithBracesForms = (s: string): string[] => {
  const parts = wordWithBracesParser(s);

  const max = 1 << Math.floor(parts.length / 2);
  const variants: string[] = [];
  for (let mask = 0; mask < max; ++mask) {
    variants.push(buildWithOddMask(parts, mask));
  }
  return variants;
};
