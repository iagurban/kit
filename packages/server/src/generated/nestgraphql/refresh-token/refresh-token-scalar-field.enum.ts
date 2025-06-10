import { registerEnumType } from '@nestjs/graphql';

export enum RefreshTokenScalarFieldEnum {
    id = "id",
    userId = "userId",
    createdAt = "createdAt",
    expiresAt = "expiresAt",
    hash = "hash"
}


registerEnumType(RefreshTokenScalarFieldEnum, { name: 'RefreshTokenScalarFieldEnum', description: undefined })
