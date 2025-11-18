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
