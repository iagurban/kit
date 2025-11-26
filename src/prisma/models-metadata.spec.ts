import { ExMap } from '../core';
import { getModelsMetadataFromString, ModelMeta } from './models-metadata';

describe('getModelsMetadataFromString', () => {
  it('should return an empty ExMap when no models are in the schema', () => {
    const schema = `
      datasource db {
        provider = "sqlite"
        url      = "file:./dev.db"
      }

      generator client {
        provider = "prisma-client-js"
      }
    `;
    const result = getModelsMetadataFromString(schema);

    expect(result.models).toBeInstanceOf(ExMap);
    expect([...result.models.entries()].length).toBe(0);
  });

  it('should extract a single model from the schema', () => {
    const schema = `
      model User {
        id   Int    @id @default(autoincrement())
        name String
      }
    `;
    const result = getModelsMetadataFromString(schema);

    expect(result.models).toBeInstanceOf(ExMap);
    expect([...result.models.entries()].length).toBe(1);
    const userModel = result.models.get('User');
    expect(userModel).toBeInstanceOf(ModelMeta);
    expect(userModel?.raw.name.value).toBe('User');
  });

  it('should extract multiple models from the schema', () => {
    const schema = `
      model User {
        id   Int    @id @default(autoincrement())
        name String
      }

      model Post {
        id      Int      @id @default(autoincrement())
        content String
        userId  Int
      }
    `;
    const result = getModelsMetadataFromString(schema);

    expect(result.models).toBeInstanceOf(ExMap);
    expect([...result.models.entries()].length).toBe(2);
    const userModel = result.models.get('User');
    const postModel = result.models.get('Post');
    expect(userModel).toBeInstanceOf(ModelMeta);
    expect(postModel).toBeInstanceOf(ModelMeta);
    expect(userModel?.raw.name.value).toBe('User');
    expect(postModel?.raw.name.value).toBe('Post');
  });

  it('should ignore non-model declarations in the schema', () => {
    const schema = `
      model User {
        id   Int    @id @default(autoincrement())
        name String
      }

      enum Role {
        USER
        ADMIN
      }
    `;
    const result = getModelsMetadataFromString(schema);

    expect(result.models).toBeInstanceOf(ExMap);
    expect([...result.models.entries()].length).toBe(1);
    const userModel = result.models.get('User');
    expect(userModel).toBeInstanceOf(ModelMeta);
    expect(userModel?.raw.name.value).toBe('User');
  });

  it('should handle schemas with no valid model declarations gracefully', () => {
    const schema = `
      enum Status {
        ACTIVE
        INACTIVE
      }

      datasource db {
        provider = "sqlite"
        url      = "file:./dev.db"
      }
    `;
    const result = getModelsMetadataFromString(schema);

    expect(result.models).toBeInstanceOf(ExMap);
    expect([...result.models.entries()].length).toBe(0);
  });
});

describe('ModelMeta', () => {
  it('should return fields', () => {
    const schema = `
      model User {
        id   Int    @id @default(autoincrement())
        name String
      }
    `;
    const result = getModelsMetadataFromString(schema);
    const userModel = result.models.get('User')!;
    expect(userModel.fields.length).toBe(2);
    expect(userModel.fields[0].name).toBe('id');
    expect(userModel.fields[1].name).toBe('name');
  });

  it('should return fields by name', () => {
    const schema = `
      model User {
        id   Int    @id @default(autoincrement())
        name String
      }
    `;
    const result = getModelsMetadataFromString(schema);
    const userModel = result.models.get('User')!;
    expect(userModel.fieldsByName.size).toBe(2);
    expect(userModel.fieldsByName.get('id')?.name).toBe('id');
    expect(userModel.fieldsByName.get('name')?.name).toBe('name');
  });

  it('should return block attributes', () => {
    const schema = `
      model User {
        firstName String
        lastName String
        @@id([firstName, lastName])
      }
    `;
    const result = getModelsMetadataFromString(schema);
    const userModel = result.models.get('User')!;
    expect(userModel.blockAttributes.length).toBe(1);
    expect(userModel.blockAttributes[0].raw.path.value[0]).toBe('id');
  });

  it('should cache getters with @once decorator', () => {
    const schema = `
      model User {
        id   Int    @id @default(autoincrement())
        name String
      }
    `;
    const result = getModelsMetadataFromString(schema);
    const userModel = result.models.get('User')!;

    const fields1 = userModel.fields;
    const fields2 = userModel.fields;
    expect(fields1).toBe(fields2);

    const fieldsByName1 = userModel.fieldsByName;
    const fieldsByName2 = userModel.fieldsByName;
    expect(fieldsByName1).toBe(fieldsByName2);

    const blockAttributes1 = userModel.blockAttributes;
    const blockAttributes2 = userModel.blockAttributes;
    expect(blockAttributes1).toBe(blockAttributes2);

    const idBlockAttribute1 = userModel.idBlockAttribute;
    const idBlockAttribute2 = userModel.idBlockAttribute;
    expect(idBlockAttribute1).toBe(idBlockAttribute2);

    const allIdFields1 = userModel.allIdFields;
    const allIdFields2 = userModel.allIdFields;
    expect(allIdFields1).toBe(allIdFields2);
  });

  describe('idBlockAttribute', () => {
    it('should return null if no @@id is present', () => {
      const schema = `
        model User {
          id Int @id
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      expect(userModel.idBlockAttribute).toBeNull();
    });

    it('should return fields for a composite @@id', () => {
      const schema = `
        model User {
          firstName String
          lastName  String
          @@id([firstName, lastName])
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      const idFields = userModel.idBlockAttribute!;
      expect(idFields.length).toBe(2);
      expect(idFields[0].name).toBe('firstName');
      expect(idFields[1].name).toBe('lastName');
    });

    it('should throw an error for unsupported @@id format (multiple arguments)', () => {
      const schema = `
        model User {
          id Int
          anotherId Int
          @@id([id], [anotherId])
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      expect(() => userModel.idBlockAttribute).toThrow('unsupported schema: @@id is in unknown format');
    });

    it('should throw an error for unsupported @@id format (not an array)', () => {
      const schema = `
        model User {
          id Int
          @@id(id)
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      expect(() => userModel.idBlockAttribute).toThrow('unsupported schema: @@id is in unknown format');
    });

    it('should throw an error for unsupported @@id format (invalid item in array)', () => {
      const schema = `
        model User {
          id Int
          @@id([id(1)])
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      expect(() => userModel.idBlockAttribute).toThrow('unsupported schema: @@id is in unknown format');
    });

    it('should throw an error if @@id references a non-existent field', () => {
      const schema = `
        model User {
          id Int
          @@id([nonExistentField])
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      expect(() => userModel.idBlockAttribute).toThrow('field nonExistentField not declared');
    });
  });

  describe('allIdFields', () => {
    it('should return fields with @id', () => {
      const schema = `
        model User {
          id   Int    @id
          name String
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      const idFields = userModel.allIdFields;
      expect(idFields.length).toBe(1);
      expect(idFields[0].name).toBe('id');
    });

    it('should return fields from @@id', () => {
      const schema = `
        model User {
          firstName String
          lastName  String
          @@id([firstName, lastName])
        }
      `;
      const result = getModelsMetadataFromString(schema);
      const userModel = result.models.get('User')!;
      const idFields = userModel.allIdFields;
      expect(idFields.length).toBe(2);
      expect(idFields[0].name).toBe('firstName');
      expect(idFields[1].name).toBe('lastName');
    });

    it('should return unique fields when both @id and @@id are present', () => {
      const schema = `
            model Post {
                id      Int @id
                slug    String
                @@id([id, slug])
            }
        `;
      const { models } = getModelsMetadataFromString(schema);
      const model = models.get('Post')!;
      expect(model.allIdFields.map(f => f.name)).toEqual(['id', 'slug']);
    });
  });
});

describe('ModelFieldMeta', () => {
  it('should return empty array for attributes if none are present', () => {
    const schema = `
        model User {
            name String
        }
        `;
    const result = getModelsMetadataFromString(schema);
    const userModel = result.models.get('User')!;
    const nameField = userModel.fieldsByName.get('name')!;
    expect(nameField.attributes).toEqual([]);
  });

  it('should return hasIdAttribute correctly', () => {
    const schema = `
        model User {
            id Int @id
            name String
        }
        `;
    const result = getModelsMetadataFromString(schema);
    const userModel = result.models.get('User')!;
    const idField = userModel.fieldsByName.get('id')!;
    const nameField = userModel.fieldsByName.get('name')!;
    expect(idField.hasIdAttribute).toBe(true);
    expect(nameField.hasIdAttribute).toBe(false);
  });

  it('should cache getters with @once decorator', () => {
    const schema = `
        model User {
          id   Int    @id
        }
      `;
    const result = getModelsMetadataFromString(schema);
    const userModel = result.models.get('User')!;
    const idField = userModel.fieldsByName.get('id')!;

    const attributes1 = idField.attributes;
    const attributes2 = idField.attributes;
    expect(attributes1).toBe(attributes2);

    const hasId1 = idField.hasIdAttribute;
    const hasId2 = idField.hasIdAttribute;
    expect(hasId1).toBe(hasId2);
  });
});
