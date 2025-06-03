import { z } from 'zod';

export const ItemScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'orderKey',
  'title',
  'description',
  'price',
  'archived',
  'imageId',
  'menuId',
  'parentId',
]);
