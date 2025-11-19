import { notNull } from '../core/flow/not-null';
import { KeysetPaginatorBuilder } from './keyset-paginator';
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
});
