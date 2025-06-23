// import { ExMap } from '../collections/ex-map';
// import { notNull } from '../utils/flow-utils';
// import { once } from './once';
//
// export type SortDirection = 'asc' | 'desc';
//
// export type SortField = {
//   name: string;
//   direction: SortDirection;
//   nullsLast?: boolean;
// };
//
// export type ResolvedSortField = SortField & {
//   cursor: unknown;
// };
//
// export type OrderByValue = {
//   sort: SortDirection;
//   nulls?: 'last';
// };
//
// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface NestedOrderBy extends Record<string, NestedOrderBy | OrderByValue> {}
//
// export type LexicographicWhere<T> =
//   | { [K in keyof T]?: { [Op in keyof T[K]]?: T[K][Op] } }
//   | { AND?: LexicographicWhere<T>[]; OR?: LexicographicWhere<T>[] };
//
// export type SelectShape<T> = {
//   [K in keyof T]?: T[K] extends object ? SelectShape<T[K]> : boolean;
// };
//
// export function buildOrderBy(sortFields: ResolvedSortField[]): NestedOrderBy[] {
//   return sortFields.map(({ name, direction, nullsLast }) => {
//     const parts = name.split('.');
//     const leaf: OrderByValue = { sort: direction, ...(nullsLast ? { nulls: 'last' } : {}) };
//     return parts.reduceRight<OrderByValue | NestedOrderBy>(
//       (acc, key) => ({ [key]: acc }),
//       leaf
//     ) as NestedOrderBy;
//   });
// }
//
// export function buildKeysetWhereClause(sortFields: ResolvedSortField[]): LexicographicWhere<any> {
//   return {
//     OR: sortFields.map((_, i) => ({
//       AND: sortFields
//         .slice(0, i)
//         .map(
//           (field): Record<string, { [s: string]: unknown }> => ({
//             [field.name]: { equals: field.cursor },
//           })
//         )
//         .concat([
//           {
//             [sortFields[i].name]: {
//               [sortFields[i].direction === 'asc' ? 'gt' : 'lt']: sortFields[i].cursor,
//             },
//           },
//         ]),
//     })),
//   };
// }
//
// export function getNestedValue(obj: any, path: string): unknown {
//   return path.split('.').reduce((acc, key) => acc?.[key], obj);
// }
//
// export function buildSelectFromSortFields(sortFields: SortField[]): SelectShape<any> {
//   const select: SelectShape<any> = {};
//   for (const { name } of sortFields) {
//     const parts = name.split('.');
//     let current = select;
//     for (let i = 0; i < parts.length; i++) {
//       const part = parts[i]!;
//       if (!current[part]) {
//         current[part] = {};
//       }
//       if (i === parts.length - 1) {
//         current[part] = true;
//       } else {
//         current = current[part] as any;
//       }
//     }
//   }
//   return select;
// }
//
// export function expandSortWithRequiredRelationIds(
//   sortFields: SortField[],
//   model: ModelMetadata
// ): {
//   sortings: ResolvedSortField[];
//   select: SelectShape<any>;
// } {
//   const additional: SortField[] = [];
//   const requiredSelect: SelectShape<any> = {};
//
//   const visit = (field: string, direction: SortDirection, context: ModelMetadata, basePath: string[]) => {
//     const [head, ...rest] = field.split('.');
//     const meta = context.field(head);
//     if (!meta.relation) {
//       const name = [...basePath, head].join('.');
//       additional.push(
//         ...context.idFields.map(id => ({
//           name: `${name.split('.').slice(0, -1).join('.')}.${id}`,
//           direction,
//         }))
//       );
//       return;
//     }
//
//     const relationModel = meta.type;
//     requiredSelect[head] ||= {};
//     visit(rest.join('.'), direction, relationModel, [...basePath, head]);
//     for (const id of relationModel.idFields) {
//       additional.push({ name: [...basePath, head, id].join('.'), direction });
//     }
//   };
//
//   for (const { name, direction, nullsLast } of sortFields) {
//     const base = name.split('.');
//     const fieldMeta = model.field(base[0]!);
//     if (!fieldMeta.relation) {
//       continue;
//     }
//     visit(name, direction, model, []);
//   }
//
//   return {
//     sortings: [...sortFields, ...additional.map(f => ({ ...f, cursor: undefined! }))],
//     select: buildSelectFromSortFields([...sortFields, ...additional]),
//   };
// }
//
// export type ModelMetadata = {
//   idFields: string[];
//   field(name: string): { relation: boolean; type: any };
// };
//
// export type ParsedFieldMeta = {
//   name: string;
//   relation: boolean;
//   type: string | ParsedModelMeta;
//   isScalar: boolean;
//   isArray: boolean;
//   isRequired: boolean;
//   hasDefault: boolean;
// };
//
// export type ParsedModelMeta = {
//   name: string;
//   idFields: string[];
//   uniqueFields: string[][];
//   fields: ParsedFieldMeta[];
//   fieldsByName: ExMap<string, ParsedFieldMeta>;
//   field(name: string): ParsedFieldMeta;
// };
//
// export function extractPrismaMetadata(schema: any): ExMap<string, ParsedModelMeta> {
//   return ExMap.mappedBy(
//     schema.models.map((m: any) => {
//       const fieldsByName = ExMap.mappedBy(
//         m.fields.map(
//           (f: any): ParsedFieldMeta => ({
//             name: f.name,
//             relation: !!f.relationName,
//             type: f.type,
//             isScalar: !f.relationName,
//             isArray: f.isList,
//             isRequired: f.isRequired,
//             hasDefault: !!f.hasDefaultValue,
//           })
//         ),
//         f => f.name
//       );
//
//       return {
//         name: m.name,
//         idFields: m.idFields,
//         uniqueFields: m.uniqueFields,
//         fields: [...fieldsByName.values()],
//         fieldsByName,
//         field(name) {
//           return notNull(fieldsByName.get(name), `Unknown field '${name}' in model '${m.name}'`);
//         },
//       };
//     }),
//     m => m.name
//   );
// }
//
// export const prismaMetadata = {
//   get modelsById(): ExMap<string, ParsedModelMeta> {
//     return once(this, 'modelsById', extractPrismaMetadata(require('.prisma/client').dmmf.datamodel));
//   },
//
//   model(name: string): ParsedModelMeta {
//     return notNull(this.modelsById.get(name), `Unknown model '${name}'`);
//   },
// };
//
// export class KeysetPaginationCache {
//   static cache = new Map<string, { result: CachedPaginationInfo; accessedAt: number }>();
//
//   get(
//     model: { name: string },
//     sortFields: SortField[],
//     compute: (model: { name: string }) => CachedPaginationInfo
//   ): CachedPaginationInfo {
//     const key = `${model.name}::${JSON.stringify(sortFields)}`;
//     const cached = KeysetPaginationCache.cache.get(key);
//     if (cached) {
//       cached.accessedAt = Date.now();
//       return cached.result;
//     }
//     const result = compute(model);
//     KeysetPaginationCache.cache.set(key, { result, accessedAt: Date.now() });
//     return result;
//   }
//
//   prune(maxAgeMs: number) {
//     const now = Date.now();
//     for (const [key, { accessedAt }] of KeysetPaginationCache.cache) {
//       if (now - accessedAt > maxAgeMs) {
//         KeysetPaginationCache.cache.delete(key);
//       }
//     }
//   }
// }
//
// export type CachedPaginationInfo = {
//   sortings: ResolvedSortField[];
//   select: Record<string, unknown>;
//   orderBy: Record<string, unknown>[];
// };
//
// export class KeysetPaginator<Instance, FindManyArgs, UniqueArgs extends { where: Record<string, unknown> }> {
//   private readonly modelMeta?: ReturnType<typeof prismaMetadata.model>;
//   private readonly cache = new KeysetPaginationCache();
//
//   constructor(
//     private readonly modelManager: {
//       findMany(args: FindManyArgs): Promise<Instance[]>;
//       findUnique(args: UniqueArgs): Promise<Instance | null>;
//       $name?: string;
//       name?: string;
//     },
//     private readonly prismaMetadata?: typeof prismaMetadata
//   ) {
//     this.modelMeta = prismaMetadata?.model(
//       notNull(modelManager.$name ?? modelManager.name, () => `Can't get model name from Prisma model manager`)
//     );
//   }
//
//   getPaginationArgs(baseSort: SortField[], cursor: Record<keyof Instance, unknown>) {
//     if (!this.modelMeta) {
//       const sortings = baseSort as ResolvedSortField[];
//       return {
//         where: {},
//         orderBy: buildOrderBy(sortings),
//         select: buildSelectFromSortFields(baseSort),
//       };
//     }
//
//     const { sortings, select } = this.cache.get(this.modelMeta, baseSort, model => {
//       return expandSortWithRequiredRelationIds(baseSort, this.modelMeta!);
//     });
//
//     const cursorInstance = notNull(
//       await this.modelManager.findUnique({ where: cursor } as UniqueArgs),
//       'Cursor instance not found'
//     );
//
//     const resolved = sortings.map(f => ({
//       ...f,
//       cursor: getNestedValue(cursorInstance, f.name),
//     }));
//
//     return {
//       where: buildKeysetWhereClause(resolved),
//       orderBy: buildOrderBy(resolved),
//       select,
//     };
//   }
// }
