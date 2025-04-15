const shortTextFormatTypeArr = ['i', 'b', 'u', 's'] as const;

export type ShortTextFormatType = (typeof shortTextFormatTypeArr)[number];

const shortTextFormatTypeSet = new Set<string>(shortTextFormatTypeArr);

export const isShortTextFormatType = (s: string): s is ShortTextFormatType =>
  s.length === 1 && shortTextFormatTypeSet.has(s);

const startOfFormatsCC = 1;
export const startOfFormatS = String.fromCodePoint(startOfFormatsCC);

const startOfTextCC = 2;
export const startOfTextS = String.fromCodePoint(startOfTextCC);

const controlsRegex = new RegExp(`[${startOfFormatS}${startOfTextS}]`, 'g');

type OnPart = (s: string, formats: ShortTextFormatType[]) => void;

type Mode = () => Mode | undefined;

class Processor {
  constructor(readonly s: string, readonly onPart: OnPart) {}

  processor<T>(
    pos: number,
    onFormatsStart: (start: number, pos: number) => T,
    onTextStart: (start: number, pos: number) => T,
    onFinal: (start: number, pos: number) => void
  ) {
    const { s } = this;

    if (pos >= s.length) {
      return;
    }

    const start = pos;

    const process = () => {
      for (; ; ++pos) {
        const cc = s.codePointAt(pos);
        if (cc === undefined) {
          return;
        }
        if (cc === startOfFormatsCC) {
          return onFormatsStart(start, pos);
        }

        if (cc === startOfTextCC) {
          return onTextStart(start, pos);
        }
      }
    };

    const r = process();
    onFinal(start, pos);
    return r;
  }

  createTextParser(pos: number, formats: ShortTextFormatType[]): Mode {
    return () => {
      return this.processor(
        pos,
        (start, pos) => this.createFormatsParser(++pos),
        (start, pos) => this.createTextParser(++pos, []),
        (start, pos) => {
          if (pos !== start) {
            this.onPart(this.s.slice(start, pos), formats);
          }
        }
      );
    };
  }

  createFormatsParser(pos: number): Mode {
    return () => {
      return this.processor(
        pos,
        (start, pos) => this.createFormatsParser(++pos),
        (start, pos) =>
          this.createTextParser(
            pos + 1,
            this.s
              .slice(start, pos)
              .split('+')
              .filter((f): f is ShortTextFormatType => {
                if (isShortTextFormatType(f)) {
                  return true;
                }
                console.warn(`unknown short text format ${f}`);
                return false;
              })
          ),
        () => undefined
      );
    };
  }
}

export const RTData = {
  parse: (s: string, onPart: OnPart) => {
    const p = new Processor(s, onPart);
    let mode: Mode | undefined = p.createTextParser(0, []);
    while (mode) {
      mode = mode();
    }
  },

  serialize: (formats: string[], text: string): string => {
    text = text.replace(controlsRegex, '');
    if (!text) {
      return '';
    }
    text = `${startOfTextS}${text}`;
    if (formats.length) {
      text = `${startOfFormatS}${formats.join('+')}${text}`;
    }
    return text;
  },

  mapParts: <T>(s: string, fn: (...args: Parameters<OnPart>) => T): T[] => {
    const r: T[] = [];
    RTData.parse(s, (...a) => r.push(fn(...a)));
    return r;
  },
};
