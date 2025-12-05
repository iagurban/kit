import { notNull } from '../core';
import { KeySetPaginator, KeysetPaginatorBuilder } from './keyset-paginator';
import { getModelsMetadataFromString } from './models-metadata';

describe('Keyset paginator builder', () => {
  test('single id creation', () => {
    const metadata = getModelsMetadataFromString(`
      model Topic { 
        id String @id
      }`);

    const kp = new KeysetPaginatorBuilder<{ id: string; name: string; author: { id: string; name: string } }>(
      [{ name: 'asc' }, { author: { name: 'desc' } }, { id: 'asc' }, { author: { id: 'asc' } }],
      notNull(metadata.models.get(`Topic`))
    );
    expect(kp.orders.length).toBe(4);
  });

  test('single id creation when not full orders', () => {
    const metadata = getModelsMetadataFromString(`
      model Topic { 
        id String @id
      }`);

    const kp = new KeysetPaginatorBuilder<{ id: string; name: string; author: { id: string; name: string } }>(
      [{ name: 'asc' }, { author: { name: 'desc' } }, { author: { id: 'asc' } }],
      notNull(metadata.models.get(`Topic`))
    );
    expect(kp.orders.length).toBe(4);
  });

  test('cursor select', () => {
    const metadata = getModelsMetadataFromString(`
      model Topic { 
        id String @id
        b String
      }`);

    const kp = new KeysetPaginatorBuilder<{ id: string; name: string; author: { id: string; name: string } }>(
      [{ name: 'asc' }, { author: { name: 'desc' } }, { id: 'asc' }, { author: { id: 'asc' } }],
      notNull(metadata.models.get(`Topic`))
    );

    expect(kp.cursorSelectClause()).toEqual({ name: true, author: { name: true, id: true }, id: true });

    const cursor = { id: '123', name: 'abc', author: { id: '456', name: 'def' } };
    expect(kp.whereClause(cursor)).toEqual({
      OR: [
        { name: { gt: 'abc' } },
        {
          AND: [{ name: { equals: 'abc' } }, { author: { name: { lt: 'def' } } }],
        },
        {
          AND: [{ name: { equals: 'abc' } }, { author: { name: { equals: 'def' } } }, { id: { gt: '123' } }],
        },
        {
          AND: [
            { name: { equals: 'abc' } },
            { author: { name: { equals: 'def' } } },
            { id: { equals: '123' } },
            { author: { id: { gt: '456' } } },
          ],
        },
      ],
    });
  });

  test('should throw error for unsupported schema in order', () => {
    const metadata = getModelsMetadataFromString(`
      model Topic {
        id String @id
        title String
      }`);
    const modelMeta = notNull(metadata.models.get('Topic'));

    expect(() => {
      new KeysetPaginatorBuilder<{ id: string; title: string }>([{ title: 'asc', id: 'desc' }], modelMeta);
    }).toThrow('unsupported schema: order by title, id');
  });

  test('whereClause should throw "not found" if cursor is missing a nested property', () => {
    const metadata = getModelsMetadataFromString(`
      model Topic {
        id String @id
      }`);

    const kp = new KeysetPaginatorBuilder<{ id: string; author?: { name: string } }>(
      // @ts-expect-error: missing author.name
      [{ author: { name: 'asc' } }, { id: 'asc' }],
      notNull(metadata.models.get('Topic'))
    );

    const cursor = { id: '123' };

    expect(() => kp.whereClause(cursor)).toThrow('not found');
  });

  test('cursorSelectClause should throw "not found" on malformed order object', () => {
    const metadata = getModelsMetadataFromString(`
      model Topic {
        id String @id
      }`);

    const kp = new KeysetPaginatorBuilder<{ id: string }>(
      [{ id: 'asc' }],
      notNull(metadata.models.get('Topic'))
    );

    // @ts-expect-error Attempt to assign to const or readonly variable
    // noinspection JSConstantReassignment
    kp.orders = [{ author: { name: {} } }];

    expect(() => kp.cursorSelectClause()).toThrow('not found');
  });
});

describe('KeySetPaginator', () => {
  test('fetch works correctly with proper mocks', async () => {
    const findUniqueMock = jest.fn();
    const findManyMock = jest.fn();

    const paginator = new KeySetPaginator(findUniqueMock, findManyMock);

    const metadata = getModelsMetadataFromString(`
      model Topic {
        id String @id
        title String
      }`);
    const modelMeta = notNull(metadata.models.get('Topic'));

    const builder = new KeysetPaginatorBuilder<{ id: string; title: string }>([{ title: 'asc' }], modelMeta);

    const cursor = { id: 'cursor-id', title: 'cursor-title' };
    findUniqueMock.mockResolvedValue(cursor);

    const expectedResults = [{ id: 'res1', title: 'res-title1' }];
    findManyMock.mockResolvedValue(expectedResults);

    const whereCursor = { id: 'cursor-id' };
    const select = { id: true, title: true };
    const result = await paginator.fetch(whereCursor, builder, select);

    expect(result).toBe(expectedResults);
    expect(findUniqueMock).toHaveBeenCalledTimes(1);
    expect(findUniqueMock).toHaveBeenCalledWith(whereCursor, builder.cursorSelectClause());
    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(findManyMock).toHaveBeenCalledWith(builder.whereClause(cursor), select);
  });

  test('fetch handles findUnique error', async () => {
    const findUniqueMock = jest.fn();
    const findManyMock = jest.fn();

    const paginator = new KeySetPaginator(findUniqueMock, findManyMock);

    const metadata = getModelsMetadataFromString(`
      model Topic {
        id String @id
        title String
      }`);
    const modelMeta = notNull(metadata.models.get('Topic'));

    const builder = new KeysetPaginatorBuilder<{ id: string; title: string }>([{ title: 'asc' }], modelMeta);

    const error = new Error('Record not found');
    findUniqueMock.mockRejectedValue(error);

    const whereCursor = { id: 'non-existent-id' };
    const select = { id: true, title: true };

    await expect(paginator.fetch(whereCursor, builder, select)).rejects.toThrow(error);

    expect(findUniqueMock).toHaveBeenCalledTimes(1);
    expect(findUniqueMock).toHaveBeenCalledWith(whereCursor, builder.cursorSelectClause());
    expect(findManyMock).not.toHaveBeenCalled();
  });

  test('fetch handles findMany error', async () => {
    const findUniqueMock = jest.fn();
    const findManyMock = jest.fn();
    const paginator = new KeySetPaginator(findUniqueMock, findManyMock);
    const metadata = getModelsMetadataFromString(`
      model Topic {
        id String @id
        title String
      }`);
    const modelMeta = notNull(metadata.models.get('Topic'));
    const builder = new KeysetPaginatorBuilder<{ id: string; title: string }>([{ title: 'asc' }], modelMeta);
    const cursor = { id: 'cursor-id', title: 'cursor-title' };
    findUniqueMock.mockResolvedValue(cursor);
    const error = new Error('DB error');
    findManyMock.mockRejectedValue(error);
    const whereCursor = { id: 'cursor-id' };
    const select = { id: true, title: true };
    await expect(paginator.fetch(whereCursor, builder, select)).rejects.toThrow(error);
    expect(findUniqueMock).toHaveBeenCalledTimes(1);
    expect(findManyMock).toHaveBeenCalledTimes(1);
  });

  test('fetch handles findUnique returning null', async () => {
    const findUniqueMock = jest.fn();
    const findManyMock = jest.fn();
    const paginator = new KeySetPaginator(findUniqueMock, findManyMock);
    const metadata = getModelsMetadataFromString(`
      model Topic {
        id String @id
        title String
      }`);
    const modelMeta = notNull(metadata.models.get('Topic'));
    const builder = new KeysetPaginatorBuilder<{ id: string; title: string }>([{ title: 'asc' }], modelMeta);
    findUniqueMock.mockResolvedValue(null);
    const whereCursor = { id: 'non-existent-id' };
    const select = { id: true, title: true };
    await expect(paginator.fetch(whereCursor, builder, select)).rejects.toThrow();
    expect(findUniqueMock).toHaveBeenCalledTimes(1);
    expect(findManyMock).not.toHaveBeenCalled();
  });
});
