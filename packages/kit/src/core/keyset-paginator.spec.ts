type OrderFromObject<T> = { [K in keyof T]?: T[K] extends object ? OrderFromObject<T[K]> : 'asc' | 'desc' };

const copyOrderClause = <T>(o: OrderFromObject<T>): OrderFromObject<T> => {
  const root = {};
  let tail: object = root;

  let to: object = o;
  while (to) {
    const key = Object.keys(to)[0] as keyof typeof to;
    if (typeof to[key] === `string`) {
      tail[key] = to[key];
      return { root, tail, tailKey: key };
    }
    tail = (tail[key] as object) = {};
    to = to[key];
  }
};

class KeysetPaginator<T> {
  constructor(readonly orders: readonly OrderFromObject<T>[]) {}

  cursorSelectClause() {
    const select = {};

    const valueFor = (o: OrderFromObject<T>) => {
      let selectTail: object = select;

      let to: unknown = o;
      while (to) {
        const key = Object.keys(to)[0] as keyof typeof to;
        if (typeof to[key] === `string`) {
          selectTail[key] ??= true;
          return;
        }
        selectTail = (selectTail[key] as object) ??= {};
        to = to[key];
      }
      throw new Error(`not found`);
    };

    for (const o of this.orders) {
      valueFor(o);
    }

    return select;
  }

  whereClause(cursor: T) {
    const valueFor = (o: OrderFromObject<T>, isLast: boolean) => {
      const root1 = {};
      let tail1: object = root1;

      const root2 = {};
      let tail2: object = root2;

      let c: unknown = cursor;
      let to: unknown = o;
      while (c && to) {
        const key = Object.keys(to)[0] as keyof typeof c;
        if (typeof to[key] === `string`) {
          tail1[key] = { equals: to[key] };
          tail2[key] = { [to[key] === `asc` ? `gt` : `lt`]: to[key] };
          return { eq: isLast ? undefined : root1, neq: root2 };
        }
        tail1 = (tail1[key] as object) = {};
        tail2 = (tail2[key] as object) = {};
        c = c[key] as T[keyof T];
        to = to[key];
      }
      throw new Error(`not found`);
    };

    const withValues = this.orders.map((o, i, a) => valueFor(o, i >= a.length - 1));
    const ands = [];
    const prev = [];
    for (const v of withValues) {
      ands.push(prev.length ? { AND: [...prev, v.neq] } : v.neq);
      prev.push(v.eq);
    }

    return { OR: ands };
  }
}

describe('Keyset paginator', () => {
  test('123', () => {
    const kp = new KeysetPaginator<{ id: string; name: string; author: { id: string; name: string } }>([
      { name: 'asc' },
      { author: { name: 'desc' } },
      { id: 'asc' },
      { author: { id: 'asc' } },
    ]);
    console.dir(kp.cursorSelectClause(), { depth: null });
    console.dir(kp.whereClause({ id: '123', name: 'abc', author: { id: '456', name: 'def' } }), {
      depth: null,
    });
  });
});
