import { ModelMeta } from './models-metadata';

type OrderFromObject<T> = { [K in keyof T]?: T[K] extends object ? OrderFromObject<T[K]> : 'asc' | 'desc' };

/**
 * Class representing a builder for generating keyset pagination queries.
 * This provides methods to construct the necessary SQL-like clauses for
 * cursor-based pagination, based on the provided entity schema and ordering configuration.
 *
 * @template T The type of the paginated items.
 */
export class KeysetPaginatorBuilder<T> {
  constructor(
    orders: readonly OrderFromObject<T>[],
    readonly meta: ModelMeta
  ) {
    const requiredKeys = new Set(meta.allIdFields.map(f => f.name));
    for (const o of orders) {
      const keys = Object.keys(o);
      if (keys.length !== 1) {
        throw new Error(`unsupported schema: order by ${keys.join(`, `)}`);
      }
      const [key] = keys;
      if (requiredKeys.has(key) && typeof o[key as keyof typeof o] === `string`) {
        requiredKeys.delete(key);
      }
    }

    if (requiredKeys.size) {
      const ordersMutable = [...orders];
      for (const key of requiredKeys) {
        ordersMutable.push({ [key]: `asc` } as OrderFromObject<T>);
      }
      this.orders = ordersMutable;
    } else {
      this.orders = orders;
    }
  }

  readonly orders: readonly OrderFromObject<T>[];

  /**
   * Generates a "select" clause object representing the fields required for cursor-based pagination
   * based on the ordering configuration of the current instance.
   *
   * @return An object containing the structured fields to be selected for the query.
   */
  cursorSelectClause() {
    const select = {};

    const valueFor = (o: OrderFromObject<T>) => {
      let selectTail: { [s: string]: object | boolean } = select;

      let to: unknown = o;
      while (to) {
        const key = Object.keys(to)[0] as keyof typeof to;
        if (typeof to[key] === `string`) {
          selectTail[key] ??= true;
          return;
        }
        selectTail = (selectTail[key] as typeof selectTail) ??= {};
        to = to[key];
      }
      throw new Error(`not found`);
    };

    for (const o of this.orders) {
      valueFor(o);
    }

    return select;
  }

  /**
   * Constructs and returns a structured "where" clause object based on the provided cursor and predefined orders.
   *
   * @param {T} cursor - The cursor object used to generate comparison values for the "where" clause.
   * @return A structured object representing the "where" clause containing logical operators and conditions.
   */
  whereClause(cursor: T) {
    const valueFor = (o: OrderFromObject<T>, isLast: boolean) => {
      const root1 = {};
      let tail1: { [s: string]: object } = root1;

      const root2 = {};
      let tail2: { [s: string]: object } = root2;

      let c: unknown = cursor;
      let to: unknown = o;
      while (c && to) {
        const key = Object.keys(to)[0] as keyof typeof c;
        if (typeof to[key] === `string`) {
          tail1[key] = { equals: c[key] };
          tail2[key] = { [to[key] === `asc` ? `gt` : `lt`]: c[key] };
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

/**
 * The `KeySetPaginator` class implements a mechanism for performing efficient
 * keyset pagination on a data set using a cursor-based approach.
 *
 * This class is generic and can be used with any data type `T`.
 *
 * @template T The type of the entity being paginated.
 * @template WhereUniqueInput The type of the input used to uniquely identify a record.
 * @template WhereInput The type of the input used for filtering a collection.
 * @template Select The type of the input used for selecting specific fields.
 */
export class KeySetPaginator<T, WhereUniqueInput, WhereInput, Select> {
  constructor(
    readonly findUnique: (where: WhereUniqueInput, select: Select) => Promise<T>,
    readonly findMany: (where: WhereInput, select: Select) => Promise<T[]>
  ) {}

  async fetch(whereCursor: WhereUniqueInput, builder: KeysetPaginatorBuilder<T>, select: Select) {
    const cursor = await this.findUnique(whereCursor, builder.cursorSelectClause() as Select);
    return this.findMany(builder.whereClause(cursor) as WhereInput, select);
  }
}
