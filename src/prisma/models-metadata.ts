import {
  BlockAttribute,
  FieldDeclaration,
  ModelDeclaration,
  ModelDeclarationMember,
  parsePrismaSchema,
} from '@loancrate/prisma-schema-parser';

import { ExMap, notNull, Nullish, once } from '../core/index';

const isFieldMdm = (m: ModelDeclarationMember): m is FieldDeclaration => m.kind === 'field';
const isBlockAttributeMdm = (m: ModelDeclarationMember): m is BlockAttribute => m.kind === 'blockAttribute';

/**
 * Represents a model block attribute wrapper that allows handling
 * attributes of a block within a model construct.
 */
export class ModelBlockAttribute {
  constructor(readonly raw: BlockAttribute) {}
}

/**
 * Represents metadata about a model field, including its name and associated attributes.
 */
export class ModelFieldMeta {
  constructor(readonly raw: FieldDeclaration) {}

  /**
   * Retrieves the name value from the raw object property.
   *
   * @return {string} The name value.
   */
  get name(): string {
    return this.raw.name.value;
  }

  /**
   * Retrieves the attributes of the current object. If no attributes are available, returns an empty array.
   * Decorated with @once to ensure that the getter is executed only once and caches the result thereafter.
   *
   * @return {Array} The list of attributes for the current object, or an empty array if no attributes are defined.
   */
  @once
  get attributes(): Exclude<FieldDeclaration['attributes'], Nullish> {
    return this.raw.attributes || [];
  }

  /**
   * Checks if the attributes contain an `id` attribute.
   *
   * @return {boolean} True if the attributes include an `id` attribute, otherwise false.
   */
  @once
  get hasIdAttribute(): boolean {
    return this.attributes.some(a => a.path.value.length === 1 && a.path.value[0] === `id`);
  }
}

/**
 * Represents metadata for a model declaration which provides information about fields,
 * block attributes, and identification attributes in the model schema.
 */
export class ModelMeta {
  constructor(readonly raw: ModelDeclaration) {}

  /**
   * Retrieves the list of field metadata for the model.
   * The method filters the raw member data to identify valid field metadata
   * and maps them into ModelFieldMeta instances.
   *
   * @return {Array<ModelFieldMeta>} An array of ModelFieldMeta instances representing the fields.
   */
  @once
  get fields(): ModelFieldMeta[] {
    return this.raw.members.filter(isFieldMdm).map(m => new ModelFieldMeta(m));
  }

  /**
   * Retrieves a mapping of fields by their names.
   *
   * @return {ExMap} A map where each key is a field name and its corresponding value is the field object.
   */
  @once
  get fieldsByName(): ExMap<string, ModelFieldMeta> {
    return ExMap.mappedBy(this.fields, f => f.name);
  }

  /**
   * Retrieves a list of block attributes from the raw members.
   * Filters the members to include only those identified as block attributes
   * and maps them to instances of ModelBlockAttribute.
   *
   * @return {Array<ModelBlockAttribute>} An array of ModelBlockAttribute instances extracted from the raw members.
   */
  @once
  get blockAttributes(): ModelBlockAttribute[] {
    return this.raw.members.filter(isBlockAttributeMdm).map(m => new ModelBlockAttribute(m));
  }

  /**
   * Retrieves the block attribute related to the `id` for the corresponding schema.
   *
   * The method identifies the block attribute by checking the path value and ensures that the
   * format is valid. It validates the structure of the attribute and extracts the relevant fields,
   * ensuring they are declared and accessible within the context.
   *
   * @return {Array<Object>|null} An array of fields corresponding to the `id` block attribute if
   *                              present and correctly formatted; otherwise, null. Throws an error
   *                              if the schema format is unsupported or fields are not declared.
   */
  @once
  get idBlockAttribute(): ModelFieldMeta[] | null {
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

  /**
   * Retrieves all fields or attributes marked as ID within the current object.
   * Combines ID fields from `idBlockAttribute` and fields containing the `hasIdAttribute` property.
   *
   * @return {Array} A unique array of all fields or attributes identified as ID within the object.
   */
  @once
  get allIdFields(): ModelFieldMeta[] {
    return [...new Set([...(this.idBlockAttribute || []), ...this.fields.filter(f => f.hasIdAttribute)])];
  }
}

/**
 * Parses a Prisma schema string and extracts metadata information for all model declarations.
 *
 * This function processes the provided Prisma schema string, identifies model declarations,
 * and creates a mapping of model names to their corresponding metadata.
 *
 * @param {string} s - A string representation of the Prisma schema.
 * @returns {{ models: ExMap<string, ModelMeta> }} An object containing a mapping of model names
 * to their respective metadata as `ModelMeta` objects.
 */
export const getModelsMetadataFromString = (s: string): { models: ExMap<string, ModelMeta> } => {
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
