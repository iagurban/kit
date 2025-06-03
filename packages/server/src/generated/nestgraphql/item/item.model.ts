import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

import { Prisma } from '../../db-client';
import Decimal = Prisma.Decimal;
import { Menu } from '../menu/menu.model';
import { UploadedFile } from '../uploaded-file/uploaded-file.model';
import { ItemCount } from './item-count.output';

@ObjectType()
export class Item {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => GraphQLDecimal, { nullable: true })
  price!: Decimal | null;

  @Field(() => Boolean, { defaultValue: false, nullable: false })
  archived!: boolean;

  @Field(() => String, { nullable: true })
  imageId!: string | null;

  @Field(() => String, { nullable: false })
  menuId!: string;

  @Field(() => String, { nullable: true })
  parentId!: string | null;

  @Field(() => UploadedFile, { nullable: true })
  image?: UploadedFile | null;

  @Field(() => Menu, { nullable: false })
  menu?: Menu;

  @Field(() => Item, { nullable: true })
  parent?: Item | null;

  @Field(() => [Item], { nullable: true })
  children?: Array<Item>;

  @Field(() => ItemCount, { nullable: false })
  _count?: ItemCount;
}
