import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Item } from '../item/item.model';
import { Tag } from '../tag/tag.model';
import { UploadedFile } from '../uploaded-file/uploaded-file.model';
import { User } from '../user/user.model';
import { MenuCount } from './menu-count.output';

@ObjectType()
export class Menu {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => User, { nullable: false })
  owner?: User;

  @Field(() => [Item], { nullable: true })
  items?: Array<Item>;

  @Field(() => [Tag], { nullable: true })
  tags?: Array<Tag>;

  @Field(() => [UploadedFile], { nullable: true })
  files?: Array<UploadedFile>;

  @Field(() => MenuCount, { nullable: false })
  _count?: MenuCount;
}
