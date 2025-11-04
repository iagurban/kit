import {
  BlockAttribute,
  FieldDeclaration,
  ModelDeclaration,
  ModelDeclarationMember,
  parsePrismaSchema,
} from '@loancrate/prisma-schema-parser';

import { ExMap } from '../collections/ex-map';
import { notNull } from '../utils/flow/flow-utils';
import { once } from './once';

const isFieldMdm = (m: ModelDeclarationMember): m is FieldDeclaration => m.kind === 'field';
const isBlockAttributeMdm = (m: ModelDeclarationMember): m is BlockAttribute => m.kind === 'blockAttribute';

class ModelBlockAttribute {
  constructor(readonly raw: BlockAttribute) {}
}

class ModelFieldMeta {
  constructor(readonly raw: FieldDeclaration) {}

  get name() {
    return this.raw.name.value;
  }

  @once
  get attributes() {
    return this.raw.attributes || [];
  }

  @once
  get hasIdAttribute() {
    return this.attributes.some(a => a.path.value.length === 1 && a.path.value[0] === `id`);
  }
}

class ModelMeta {
  constructor(readonly raw: ModelDeclaration) {}

  @once
  get fields() {
    return this.raw.members.filter(isFieldMdm).map(m => new ModelFieldMeta(m));
  }

  @once
  get fieldsByName() {
    return ExMap.mappedBy(this.fields, f => f.name);
  }

  @once
  get blockAttributes() {
    return this.raw.members.filter(isBlockAttributeMdm).map(m => new ModelBlockAttribute(m));
  }

  @once
  get idBlockAttribute() {
    const ba = this.blockAttributes.find(b => b.raw.path.value.length === 1 && b.raw.path.value[0] === `id`);
    if (!ba) {
      return null;
    }

    const args = notNull(ba.raw.args);
    if (args.length !== 1) {
      throw new Error(`unsupported schema: @@id is in unknown format`);
    }
    const [arg] = args;
    if (arg.kind !== `array`) {
      throw new Error(`unsupported schema: @@id is in unknown format`);
    }

    return arg.items.map(a => {
      if (a.kind !== `path` || a.value.length !== 1) {
        throw new Error(`unsupported schema: @@id is in unknown format`);
      }
      const [name] = a.value;
      return notNull(this.fieldsByName.get(name), () => `field ${name} not declared`);
    });
  }

  @once
  get allIdFields() {
    return [...new Set([...(this.idBlockAttribute || []), ...this.fields.filter(f => f.hasIdAttribute)])];
  }
}

export const getModelsMetadataFromString = (s: string) => {
  const schema = parsePrismaSchema(s);

  const models = new ExMap<string, ModelMeta>();

  for (const d of schema.declarations) {
    switch (d.kind) {
      case 'model':
        models.set(d.name.value, new ModelMeta(d));
        break;
    }
  }

  return { models };
};

type OrderFromObject<T> = { [K in keyof T]?: T[K] extends object ? OrderFromObject<T[K]> : 'asc' | 'desc' };

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
