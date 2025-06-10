import { registerEnumType } from '@nestjs/graphql';

export enum TagScalarFieldEnum {
    id = "id",
    menuId = "menuId"
}


registerEnumType(TagScalarFieldEnum, { name: 'TagScalarFieldEnum', description: undefined })
