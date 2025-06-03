import { isDefined, notNull } from '@freyja/kit';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  IntersectionType,
  Mutation,
  PartialType,
  PickType,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/current-user';
import { PrismaSelection } from '../../decorators/prisma-selection';
import { Prisma } from '../../generated/db-client';
import { Menu } from '../../generated/nestgraphql/menu/menu.model';
import { MenuWhereUniqueInput as GqlMenuWhereUniqueInput } from '../../generated/nestgraphql/menu/menu-where-unique.input';
import { UploadedFile } from '../../generated/nestgraphql/uploaded-file/uploaded-file.model';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { DbService } from '../db/db.service';
import { FilesResolver } from '../files/files.resolver';
import MenuWhereUniqueInput = Prisma.MenuWhereUniqueInput;
import MenuSelect = Prisma.MenuSelect;
import UploadedFileSelect = Prisma.UploadedFileSelect;

@InputType()
class MyMenuUpdateFields {
  @Field(() => String, { nullable: true })
  title?: string | null;
}

@InputType()
class NullableStringInput {
  @Field(() => String, { nullable: true })
  value?: string | null;
}

@InputType()
class MyItemCreateInput {
  @Field(() => String)
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String)
  orderKey!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  parentId?: string;
}

@InputType()
class MyItemUpdateInput extends IntersectionType(
  PickType(MyItemCreateInput, [`id`]),
  PartialType(PickType(MyItemCreateInput, [`orderKey`]))
) {
  @Field(() => NullableStringInput, { nullable: true })
  title?: NullableStringInput;

  @Field(() => NullableStringInput, { nullable: true })
  description?: NullableStringInput;

  @Field(() => NullableStringInput, { nullable: true })
  parentId?: NullableStringInput;
}

@InputType()
class SaveMenuInput {
  @Field(() => String)
  id!: string;

  @Field(() => MyMenuUpdateFields)
  fields!: MyMenuUpdateFields;

  @Field(() => [MyItemUpdateInput])
  updates!: MyItemUpdateInput[];

  @Field(() => [MyItemCreateInput])
  creates!: MyItemCreateInput[];
}

@Resolver(() => Menu)
export class MenusResolver {
  static readonly dynamicFields = [
    'images',
    ...FilesResolver.dynamicFields.map(s => `items.image.${s}` as const),
  ] as const;

  constructor(readonly db: DbService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Menu, { nullable: true })
  async menu(
    @Args(`where`, { type: () => GqlMenuWhereUniqueInput, nullable: true })
    where: GqlMenuWhereUniqueInput | undefined,
    @CurrentUser() user: CurrentUser,
    @PrismaSelection({ skip: MenusResolver.dynamicFields }) select: MenuSelect | undefined
  ): Promise<Menu | null> {
    const p = { select, where: { ownerId: user.id } };
    return where
      ? this.db.client.menu.findUnique({ ...p, where: { ...(where as MenuWhereUniqueInput), ...p.where } })
      : this.db.client.menu.findFirst(p);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Menu])
  availableMenus(@CurrentUser() user: CurrentUser): Promise<Menu[]> {
    return this.db.client.menu.findMany({ where: { ownerId: user.id } });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Menu)
  async saveMenu(
    @Args(`menu`) menuInput: SaveMenuInput,
    @CurrentUser() user: CurrentUser,
    @PrismaSelection({ skip: MenusResolver.dynamicFields }) select: MenuSelect | undefined
  ) {
    const menu = notNull(await this.db.client.menu.findUnique({ where: { id: menuInput.id } }));
    if (menu.ownerId !== user.id) {
      throw new Error(`not allowed`);
    }

    {
      const oldItems = menuInput.updates.length
        ? await this.db.client.item.findMany({
            where: {
              id: { in: menuInput.updates.map(i => i.id) },
              // parent: { menuId: menu.id },
              menuId: menu.id,
            },
          })
        : [];
      if (oldItems.length !== menuInput.updates.length) {
        throw new Error(`FSKLHsdfjlk`);
      }
      for (const { id, ...o } of menuInput.updates) {
        await this.db.client.item.update({
          where: { id },
          data: {
            ...o,
            title: o.title ? (o.title.value ?? null) : undefined,
            description: o.description ? (o.description.value ?? null) : undefined,
            parentId: o.parentId ? (o.parentId.value ?? null) : undefined,
          },
        });
      }
    }

    {
      const parentIds = menuInput.creates.map(i => i.parentId).filter(isDefined);
      const parents = menuInput.creates.length
        ? await this.db.client.item.findMany({
            where: {
              id: { in: parentIds },
              menuId: menu.id,
            },
          })
        : [];
      if (parents.length !== menuInput.creates.length) {
        throw new Error(`FSKLHsdfjlk`);
      }
      for (const { id, ...o } of menuInput.creates) {
        await this.db.client.item.create({
          data: {
            ...o,
            title: o.title ?? null,
            description: o.description ?? null,
            parentId: o.parentId ?? null,

            menuId: menu.id,
          },
        });
      }
    }

    console.log(`save`);
    console.dir(menu);

    return this.db.client.menu.findUnique({ select, where: { id: menu.id } });
  }

  @ResolveField(() => [UploadedFile])
  async images(
    @Root() self: Menu,
    @PrismaSelection({ skip: FilesResolver.dynamicFields }) select: UploadedFileSelect | undefined
  ): Promise<UploadedFile[]> {
    return this.db.client.uploadedFile.findMany({ select, where: { menu: { id: self.id } } });
  }
}
