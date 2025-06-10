import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { StoredFile } from '../stored-file/stored-file.model';
import { Menu } from '../menu/menu.model';
import { Item } from '../item/item.model';
import { UploadedFileCount } from './uploaded-file-count.output';

@ObjectType()
export class UploadedFile {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    originalName!: string;

    @Field(() => String, {nullable:false})
    mimetype!: string;

    @Field(() => Date, {nullable:false})
    uploadedAt!: Date;

    @Field(() => String, {nullable:false})
    uploaderId!: string;

    @Field(() => String, {nullable:false})
    storedFileId!: string;

    @Field(() => String, {nullable:false})
    menuId!: string;

    @Field(() => User, {nullable:false})
    uploader?: User;

    @Field(() => StoredFile, {nullable:false})
    storedFile?: StoredFile;

    @Field(() => Menu, {nullable:false})
    menu?: Menu;

    @Field(() => [Item], {nullable:true})
    usingItems?: Array<Item>;

    @Field(() => UploadedFileCount, {nullable:false})
    _count?: UploadedFileCount;
}
