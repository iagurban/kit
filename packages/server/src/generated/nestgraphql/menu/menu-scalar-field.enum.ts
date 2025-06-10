import { registerEnumType } from '@nestjs/graphql';

export enum MenuScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    title = "title",
    ownerId = "ownerId"
}


registerEnumType(MenuScalarFieldEnum, { name: 'MenuScalarFieldEnum', description: undefined })
