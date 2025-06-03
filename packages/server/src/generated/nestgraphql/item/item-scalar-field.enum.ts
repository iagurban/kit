import { registerEnumType } from '@nestjs/graphql';

export enum ItemScalarFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
  orderKey = 'orderKey',
  title = 'title',
  description = 'description',
  price = 'price',
  archived = 'archived',
  imageId = 'imageId',
  menuId = 'menuId',
  parentId = 'parentId',
}

registerEnumType(ItemScalarFieldEnum, { name: 'ItemScalarFieldEnum', description: undefined });
