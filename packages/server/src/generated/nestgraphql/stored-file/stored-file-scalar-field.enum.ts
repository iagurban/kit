import { registerEnumType } from '@nestjs/graphql';

export enum StoredFileScalarFieldEnum {
    id = "id",
    hash = "hash",
    size = "size",
    createdAt = "createdAt"
}


registerEnumType(StoredFileScalarFieldEnum, { name: 'StoredFileScalarFieldEnum', description: undefined })
