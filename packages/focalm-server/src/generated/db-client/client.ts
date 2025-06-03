
/**
 * Client
 */

import * as runtime from '@prisma/client/runtime/binary'
import * as process from 'node:process'
import * as path from 'node:path'


export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = runtime.Types.Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model StoredFile
 * 
 */
export type StoredFile = runtime.Types.Result.DefaultSelection<Prisma.$StoredFilePayload>
/**
 * Model UploadedFile
 * 
 */
export type UploadedFile = runtime.Types.Result.DefaultSelection<Prisma.$UploadedFilePayload>
/**
 * Model TaskHistoryValue
 * 
 */
export type TaskHistoryValue = runtime.Types.Result.DefaultSelection<Prisma.$TaskHistoryValuePayload>
/**
 * Model TaskHistoryGroup
 * 
 */
export type TaskHistoryGroup = runtime.Types.Result.DefaultSelection<Prisma.$TaskHistoryGroupPayload>
/**
 * Model Task
 * 
 */
export type Task = runtime.Types.Result.DefaultSelection<Prisma.$TaskPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TaskState = {
  Pending: 'Pending',
  Active: 'Active',
  Done: 'Done'
} as const

export type TaskState = (typeof TaskState)[keyof typeof TaskState]


export const TaskHistoryKey = {
  title: 'title',
  state: 'state',
  archived: 'archived',
  impact: 'impact',
  ease: 'ease',
  authorId: 'authorId',
  responsibleId: 'responsibleId',
  orderKey: 'orderKey',
  parentId: 'parentId'
} as const

export type TaskHistoryKey = (typeof TaskHistoryKey)[keyof typeof TaskHistoryKey]


export const CreatedAtFixReason = {
  Low: 'Low',
  High: 'High',
  Both: 'Both'
} as const

export type CreatedAtFixReason = (typeof CreatedAtFixReason)[keyof typeof CreatedAtFixReason]

}

export type TaskState = $Enums.TaskState

export const TaskState = $Enums.TaskState

export type TaskHistoryKey = $Enums.TaskHistoryKey

export const TaskHistoryKey = $Enums.TaskHistoryKey

export type CreatedAtFixReason = $Enums.CreatedAtFixReason

export const CreatedAtFixReason = $Enums.CreatedAtFixReason



/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client"
    },
    "output": {
      "value": "/home/ing/IdeaProjects/jelovnik/packages/focalm-server/src/generated/db-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "binary"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.1.x",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/ing/IdeaProjects/jelovnik/packages/focalm-server/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://ing:qweqweqwe@localhost:5432/focalm_db"
      }
    }
  },
  "inlineSchema": "datasource db {\n  url      = env(\"DATABASE_URL\")\n  provider = \"postgresql\"\n}\n\ngenerator oldClient {\n  provider      = \"prisma-client-js\"\n  output        = \"../src/generated/old-client\"\n  engineType    = \"binary\"\n  binaryTargets = [\"native\", \"debian-openssl-3.0.x\"]\n}\n\ngenerator client {\n  provider      = \"prisma-client\"\n  output        = \"../src/generated/db-client\"\n  engineType    = \"binary\"\n  binaryTargets = [\"native\", \"debian-openssl-3.0.x\"]\n}\n\ngenerator json {\n  provider = \"yarn prisma-json-types-generator\"\n}\n\ngenerator nestgraphql {\n  provider = \"prisma-nestjs-graphql\"\n  output   = \"../src/generated/nestgraphql\"\n\n  prismaClientImport = \"../../db-client\"\n  purgeOutput        = true\n\n  emitInputBinding = true // ← экспортирует типы ввода\n  useInputType     = true // ← делает все non-null поля — non-null в GraphQL\n}\n\n// generator nestjsDto {\n//   provider = \"prisma-generator-nestjs-dto\"\n//   output   = \"../src/generated/nestjs-dto\"\n//\n//   outputToNestJsResourceStructure = \"true\" // writes dtos and entities to subfolders aligned with NestJS CRUD generator (false)\n//   exportRelationModifierClasses   = \"true\" // Should extra classes generated for relationship field operations on DTOs be exported? (true)\n//   reExport                        = \"false\" // Should an index.ts be created for every folder? (false)\n//   createDtoPrefix                 = \"Create\" // phrase to prefix every CreateDTO class with (Create)\n//   updateDtoPrefix                 = \"Update\" // phrase to prefix every UpdateDTO class with (Update)\n//   dtoSuffix                       = \"Dto\" // phrase to suffix every CreateDTO and UpdateDTO class with (Dto)\n//   entityPrefix                    = \"\" // phrase to prefix every Entity class with (<empty>)\n//   entitySuffix                    = \"\" // phrase to suffix every Entity class with (<empty>)\n//   fileNamingStyle                 = \"camel\" // how to name generated files. Valid choices are \"camel\", \"pascal\", \"kebab\" and \"snake\". (camel)\n// }\n\n// generator erd {\n//   provider = \"prisma-erd-generator\"\n//\n//   output   = \"../prisma/ERD.svg\" // svg (default: ./prisma/ERD.svg), png, pdf, md\n//   // theme    = \"forest\" // default, forest, dark, neutral\n//   mmdcPath = \"./CI\"\n//\n//   // tableOnly = true\n//   // ignoreEnums = true\n//   includeRelationFromFields = true\n//   // disableEmoji = true\n//   // puppeteerConfig = \"../puppeteerConfig.json\"\n// }\n\n// generator prismaClassGenerator {\n//   provider = \"prisma-class-generator\"\n//\n//   output = \"../src/generated/classes\"\n//\n//   dryRun                   = false\n//   // useSwagger = false\n//   // makeIndexFile = false\n//   // separateRelationFields = true\n//   clientImportPath         = \"../db-client\"\n//   useNonNullableAssertions = false\n//   preserveDefaultNullable  = true\n// }\n\n// generator joi {\n//   provider = \"prisma-joi-generator\"\n//   output   = \"../src/generated/joi\"\n// }\n\ngenerator zod {\n  provider = \"prisma-zod-generator\"\n  output   = \"../src/generated/zod\"\n\n  isGenerateSelect  = true\n  isGenerateInclude = true\n}\n\ngenerator typescriptInterfaces {\n  provider = \"prisma-generator-typescript-interfaces\"\n\n  output      = \"../src/generated/interfaces.ts\"\n  modelType   = \"type\"\n  enumType    = \"enum\"\n  decimalType = \"number\"\n  // optionalNullables = true\n  // prettier    = true\n}\n\n// generator crudGrahql {\n//   provider = \"nestjs-prisma-graphql-crud-gen\"\n//   output   = \"../generated/crud\"\n// }\n\nmodel User {\n  id        String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  createdAt DateTime @default(now())\n\n  email String @unique\n  name  String @unique\n\n  passwordHash String @map(\"externalId\")\n\n  uploadedFiles UploadedFile[]\n\n  refreshTokens RefreshToken[]\n\n  assignedTasks       Task[]             @relation(\"responsible\")\n  authoredTasks       Task[]             @relation(\"author\")\n  authoredTaskChanges TaskHistoryGroup[]\n}\n\nmodel RefreshToken {\n  id String @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n\n  userId String @db.Uuid\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  expiresAt DateTime\n\n  hash String\n}\n\nmodel StoredFile {\n  id String @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid // 'abcdefgh' means path ab/cd/efgh\n\n  hash String\n  size Int\n\n  createdAt DateTime @default(now())\n\n  uploads UploadedFile[]\n\n  @@index([hash])\n}\n\nmodel UploadedFile {\n  id String @id @default(uuid())\n\n  originalName String\n  mimetype     String\n\n  uploadedAt DateTime @default(now())\n\n  uploaderId String @db.Uuid\n  uploader   User   @relation(fields: [uploaderId], references: [id])\n\n  storedFileId String     @db.Uuid\n  storedFile   StoredFile @relation(fields: [storedFileId], references: [id], onDelete: Restrict)\n}\n\nenum TaskState {\n  Pending\n  Active\n  Done\n}\n\nenum TaskHistoryKey {\n  title\n  state\n  archived\n  impact\n  ease\n  authorId\n  responsibleId\n  orderKey\n  parentId\n}\n\nmodel TaskHistoryValue {\n  groupId String           @db.Uuid\n  group   TaskHistoryGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)\n\n  taskId String @db.Uuid // denormalization; equals `this.group.taskId`; remove when prisma can do nested distinct\n\n  key TaskHistoryKey\n\n  value Json\n\n  @@id([groupId, key])\n}\n\nenum CreatedAtFixReason {\n  Low\n  High\n  Both\n}\n\nmodel TaskHistoryGroup {\n  id String @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n\n  taskId String @db.Uuid\n  task   Task   @relation(fields: [taskId], references: [id], onDelete: Cascade)\n\n  values TaskHistoryValue[]\n\n  authorId String @db.Uuid\n  author   User   @relation(fields: [authorId], references: [id])\n\n  localCreatedAt     DateTime\n  createdAt          DateTime // fixed\n  createdAtFixReason CreatedAtFixReason?\n}\n\nmodel Task {\n  id String @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n\n  title    String\n  state    TaskState @default(Pending)\n  archived Boolean   @default(false)\n\n  impact Float @default(0.5)\n  ease   Float @default(0.5)\n\n  startAfter   DateTime?\n  plannedStart DateTime?\n  dueTo        DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  authorId String @db.Uuid\n  author   User   @relation(\"author\", fields: [authorId], references: [id], onDelete: Restrict)\n\n  responsibleId String? @db.Uuid\n  responsible   User?   @relation(\"responsible\", fields: [responsibleId], references: [id], onDelete: Restrict)\n\n  parentId String? @db.Uuid\n  parent   Task?   @relation(\"tree\", fields: [parentId], references: [id], onDelete: SetNull)\n  children Task[]  @relation(\"tree\")\n  orderKey String\n\n  historyGroups TaskHistoryGroup[]\n}\n",
  "inlineSchemaHash": "810303cdda7cd1dd5c6751956e65da618d6bca2d3eb951a0074cb43a1d1e0f2e",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
}
config.dirname = __dirname

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwordHash\",\"dbName\":\"externalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uploadedFiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UploadedFile\",\"nativeType\":null,\"relationName\":\"UploadedFileToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refreshTokens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RefreshToken\",\"nativeType\":null,\"relationName\":\"RefreshTokenToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedTasks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Task\",\"nativeType\":null,\"relationName\":\"responsible\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authoredTasks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Task\",\"nativeType\":null,\"relationName\":\"author\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authoredTaskChanges\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskHistoryGroup\",\"nativeType\":null,\"relationName\":\"TaskHistoryGroupToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RefreshToken\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"RefreshTokenToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"StoredFile\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"size\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uploads\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UploadedFile\",\"nativeType\":null,\"relationName\":\"StoredFileToUploadedFile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UploadedFile\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"originalName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mimetype\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uploadedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uploaderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uploader\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"UploadedFileToUser\",\"relationFromFields\":[\"uploaderId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storedFileId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storedFile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StoredFile\",\"nativeType\":null,\"relationName\":\"StoredFileToUploadedFile\",\"relationFromFields\":[\"storedFileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TaskHistoryValue\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"groupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskHistoryGroup\",\"nativeType\":null,\"relationName\":\"TaskHistoryGroupToTaskHistoryValue\",\"relationFromFields\":[\"groupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taskId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskHistoryKey\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"groupId\",\"key\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TaskHistoryGroup\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taskId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"task\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Task\",\"nativeType\":null,\"relationName\":\"TaskToTaskHistoryGroup\",\"relationFromFields\":[\"taskId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"values\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskHistoryValue\",\"nativeType\":null,\"relationName\":\"TaskHistoryGroupToTaskHistoryValue\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"TaskHistoryGroupToUser\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"localCreatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAtFixReason\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatedAtFixReason\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Task\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TaskState\",\"nativeType\":null,\"default\":\"Pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"archived\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"impact\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"nativeType\":null,\"default\":0.5,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ease\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"nativeType\":null,\"default\":0.5,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startAfter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"plannedStart\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dueTo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"author\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"responsibleId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"responsible\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"responsible\",\"relationFromFields\":[\"responsibleId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Task\",\"nativeType\":null,\"relationName\":\"tree\",\"relationFromFields\":[\"parentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"children\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Task\",\"nativeType\":null,\"relationName\":\"tree\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderKey\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"historyGroups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskHistoryGroup\",\"nativeType\":null,\"relationName\":\"TaskToTaskHistoryGroup\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"TaskState\":{\"values\":[{\"name\":\"Pending\",\"dbName\":null},{\"name\":\"Active\",\"dbName\":null},{\"name\":\"Done\",\"dbName\":null}],\"dbName\":null},\"TaskHistoryKey\":{\"values\":[{\"name\":\"title\",\"dbName\":null},{\"name\":\"state\",\"dbName\":null},{\"name\":\"archived\",\"dbName\":null},{\"name\":\"impact\",\"dbName\":null},{\"name\":\"ease\",\"dbName\":null},{\"name\":\"authorId\",\"dbName\":null},{\"name\":\"responsibleId\",\"dbName\":null},{\"name\":\"orderKey\",\"dbName\":null},{\"name\":\"parentId\",\"dbName\":null}],\"dbName\":null},\"CreatedAtFixReason\":{\"values\":[{\"name\":\"Low\",\"dbName\":null},{\"name\":\"High\",\"dbName\":null},{\"name\":\"Both\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
config.engineWasm = undefined
config.compilerWasm = undefined



// file annotations for bundling tools to include these files
path.join(__dirname, "query-engine-debian-openssl-1.1.x")
path.join(process.cwd(), "src/generated/db-client/query-engine-debian-openssl-1.1.x")

// file annotations for bundling tools to include these files
path.join(__dirname, "query-engine-debian-openssl-3.0.x")
path.join(process.cwd(), "src/generated/db-client/query-engine-debian-openssl-3.0.x")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma")
path.join(process.cwd(), "src/generated/db-client/schema.prisma")


interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  new <
    ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
  >(options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>): PrismaClient<ClientOptions, U, ExtArgs>
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => runtime.Types.Utils.JsPromise<void> : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<R>


  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storedFile`: Exposes CRUD operations for the **StoredFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StoredFiles
    * const storedFiles = await prisma.storedFile.findMany()
    * ```
    */
  get storedFile(): Prisma.StoredFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadedFile`: Exposes CRUD operations for the **UploadedFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadedFiles
    * const uploadedFiles = await prisma.uploadedFile.findMany()
    * ```
    */
  get uploadedFile(): Prisma.UploadedFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskHistoryValue`: Exposes CRUD operations for the **TaskHistoryValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskHistoryValues
    * const taskHistoryValues = await prisma.taskHistoryValue.findMany()
    * ```
    */
  get taskHistoryValue(): Prisma.TaskHistoryValueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskHistoryGroup`: Exposes CRUD operations for the **TaskHistoryGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskHistoryGroups
    * const taskHistoryGroups = await prisma.taskHistoryGroup.findMany()
    * ```
    */
  get taskHistoryGroup(): Prisma.TaskHistoryGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(config) as unknown as PrismaClientConstructor

export namespace Prisma {
  export type DMMF = typeof runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Validator
   */
  export const validator = runtime.Public.validator

  /**
   * Prisma Errors
   */

  export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError

  export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError

  export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

  export const PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export type PrismaClientInitializationError = runtime.PrismaClientInitializationError

  export const PrismaClientValidationError = runtime.PrismaClientValidationError
  export type PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export const sql = runtime.sqltag
  export const empty = runtime.empty
  export const join = runtime.join
  export const raw = runtime.raw
  export const Sql = runtime.Sql
  export type Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export const Decimal = runtime.Decimal
  export type Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = runtime.Types.Extensions.UserArgs
  export const getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>
  export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>
  export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>
  export type Exact<A, W> = runtime.Types.Public.Exact<A, W>

  export type PrismaVersion = {
    client: string
    engine: string
  }

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export const prismaVersion: PrismaVersion = {
    client: "6.6.0",
    engine: "f676762280b54cd07c770017ed3711ddde35f37a"
  }

  /**
   * Utility Types
   */


  export type JsonObject = runtime.JsonObject
  export type JsonArray = runtime.JsonArray
  export type JsonValue = runtime.JsonValue
  export type InputJsonObject = runtime.InputJsonObject
  export type InputJsonArray = runtime.InputJsonArray
  export type InputJsonValue = runtime.InputJsonValue

  export const NullTypes: {
    readonly DbNull: typeof runtime.objectEnumValues.classes.DbNull
    readonly JsonNull: typeof runtime.objectEnumValues.classes.JsonNull
    readonly AnyNull: typeof runtime.objectEnumValues.classes.AnyNull
  } = {
    DbNull: runtime.objectEnumValues.classes.DbNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull),
    JsonNull: runtime.objectEnumValues.classes.JsonNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull),
    AnyNull: runtime.objectEnumValues.classes.AnyNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull),
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: { toString(): string } = runtime.objectEnumValues.instances.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: { toString(): string } = runtime.objectEnumValues.instances.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: { toString(): string } = runtime.objectEnumValues.instances.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  export type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False

  export type True = 1

  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName = {
    User: 'User',
    RefreshToken: 'RefreshToken',
    StoredFile: 'StoredFile',
    UploadedFile: 'UploadedFile',
    TaskHistoryValue: 'TaskHistoryValue',
    TaskHistoryGroup: 'TaskHistoryGroup',
    Task: 'Task'
  } as const

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export interface TypeMapCb<ClientOptions = {}> extends runtime.Types.Utils.Fn<{extArgs: runtime.Types.Extensions.InternalArgs }, runtime.Types.Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "refreshToken" | "storedFile" | "uploadedFile" | "taskHistoryValue" | "taskHistoryGroup" | "task"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      StoredFile: {
        payload: Prisma.$StoredFilePayload<ExtArgs>
        fields: Prisma.StoredFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoredFileFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoredFileFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>
          }
          findFirst: {
            args: Prisma.StoredFileFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoredFileFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>
          }
          findMany: {
            args: Prisma.StoredFileFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>[]
          }
          create: {
            args: Prisma.StoredFileCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>
          }
          createMany: {
            args: Prisma.StoredFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoredFileCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>[]
          }
          delete: {
            args: Prisma.StoredFileDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>
          }
          update: {
            args: Prisma.StoredFileUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>
          }
          deleteMany: {
            args: Prisma.StoredFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoredFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoredFileUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>[]
          }
          upsert: {
            args: Prisma.StoredFileUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$StoredFilePayload>
          }
          aggregate: {
            args: Prisma.StoredFileAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateStoredFile>
          }
          groupBy: {
            args: Prisma.StoredFileGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<StoredFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoredFileCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<StoredFileCountAggregateOutputType> | number
          }
        }
      }
      UploadedFile: {
        payload: Prisma.$UploadedFilePayload<ExtArgs>
        fields: Prisma.UploadedFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadedFileFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadedFileFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          findFirst: {
            args: Prisma.UploadedFileFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadedFileFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          findMany: {
            args: Prisma.UploadedFileFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>[]
          }
          create: {
            args: Prisma.UploadedFileCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          createMany: {
            args: Prisma.UploadedFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadedFileCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>[]
          }
          delete: {
            args: Prisma.UploadedFileDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          update: {
            args: Prisma.UploadedFileUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          deleteMany: {
            args: Prisma.UploadedFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadedFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadedFileUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>[]
          }
          upsert: {
            args: Prisma.UploadedFileUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          aggregate: {
            args: Prisma.UploadedFileAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateUploadedFile>
          }
          groupBy: {
            args: Prisma.UploadedFileGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<UploadedFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadedFileCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<UploadedFileCountAggregateOutputType> | number
          }
        }
      }
      TaskHistoryValue: {
        payload: Prisma.$TaskHistoryValuePayload<ExtArgs>
        fields: Prisma.TaskHistoryValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskHistoryValueFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskHistoryValueFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>
          }
          findFirst: {
            args: Prisma.TaskHistoryValueFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskHistoryValueFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>
          }
          findMany: {
            args: Prisma.TaskHistoryValueFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>[]
          }
          create: {
            args: Prisma.TaskHistoryValueCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>
          }
          createMany: {
            args: Prisma.TaskHistoryValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskHistoryValueCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>[]
          }
          delete: {
            args: Prisma.TaskHistoryValueDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>
          }
          update: {
            args: Prisma.TaskHistoryValueUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>
          }
          deleteMany: {
            args: Prisma.TaskHistoryValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskHistoryValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskHistoryValueUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>[]
          }
          upsert: {
            args: Prisma.TaskHistoryValueUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryValuePayload>
          }
          aggregate: {
            args: Prisma.TaskHistoryValueAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateTaskHistoryValue>
          }
          groupBy: {
            args: Prisma.TaskHistoryValueGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TaskHistoryValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskHistoryValueCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TaskHistoryValueCountAggregateOutputType> | number
          }
        }
      }
      TaskHistoryGroup: {
        payload: Prisma.$TaskHistoryGroupPayload<ExtArgs>
        fields: Prisma.TaskHistoryGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskHistoryGroupFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskHistoryGroupFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>
          }
          findFirst: {
            args: Prisma.TaskHistoryGroupFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskHistoryGroupFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>
          }
          findMany: {
            args: Prisma.TaskHistoryGroupFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>[]
          }
          create: {
            args: Prisma.TaskHistoryGroupCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>
          }
          createMany: {
            args: Prisma.TaskHistoryGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskHistoryGroupCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>[]
          }
          delete: {
            args: Prisma.TaskHistoryGroupDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>
          }
          update: {
            args: Prisma.TaskHistoryGroupUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>
          }
          deleteMany: {
            args: Prisma.TaskHistoryGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskHistoryGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskHistoryGroupUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>[]
          }
          upsert: {
            args: Prisma.TaskHistoryGroupUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskHistoryGroupPayload>
          }
          aggregate: {
            args: Prisma.TaskHistoryGroupAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateTaskHistoryGroup>
          }
          groupBy: {
            args: Prisma.TaskHistoryGroupGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TaskHistoryGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskHistoryGroupCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TaskHistoryGroupCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension = runtime.Extensions.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<"define", Prisma.TypeMapCb, runtime.Types.Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    storedFile?: StoredFileOmit
    uploadedFile?: UploadedFileOmit
    taskHistoryValue?: TaskHistoryValueOmit
    taskHistoryGroup?: TaskHistoryGroupOmit
    task?: TaskOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
  ) => runtime.Types.Utils.JsPromise<T>

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    uploadedFiles: number
    refreshTokens: number
    assignedTasks: number
    authoredTasks: number
    authoredTaskChanges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploadedFiles?: boolean | UserCountOutputTypeCountUploadedFilesArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    assignedTasks?: boolean | UserCountOutputTypeCountAssignedTasksArgs
    authoredTasks?: boolean | UserCountOutputTypeCountAuthoredTasksArgs
    authoredTaskChanges?: boolean | UserCountOutputTypeCountAuthoredTaskChangesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedFilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: UploadedFileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthoredTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthoredTaskChangesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskHistoryGroupWhereInput
  }


  /**
   * Count Type StoredFileCountOutputType
   */

  export type StoredFileCountOutputType = {
    uploads: number
  }

  export type StoredFileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploads?: boolean | StoredFileCountOutputTypeCountUploadsArgs
  }

  // Custom InputTypes
  /**
   * StoredFileCountOutputType without action
   */
  export type StoredFileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFileCountOutputType
     */
    select?: StoredFileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StoredFileCountOutputType without action
   */
  export type StoredFileCountOutputTypeCountUploadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: UploadedFileWhereInput
  }


  /**
   * Count Type TaskHistoryGroupCountOutputType
   */

  export type TaskHistoryGroupCountOutputType = {
    values: number
  }

  export type TaskHistoryGroupCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    values?: boolean | TaskHistoryGroupCountOutputTypeCountValuesArgs
  }

  // Custom InputTypes
  /**
   * TaskHistoryGroupCountOutputType without action
   */
  export type TaskHistoryGroupCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroupCountOutputType
     */
    select?: TaskHistoryGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskHistoryGroupCountOutputType without action
   */
  export type TaskHistoryGroupCountOutputTypeCountValuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskHistoryValueWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    children: number
    historyGroups: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    children?: boolean | TaskCountOutputTypeCountChildrenArgs
    historyGroups?: boolean | TaskCountOutputTypeCountHistoryGroupsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountChildrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountHistoryGroupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskHistoryGroupWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    name: string | null
    passwordHash: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    name: string | null
    passwordHash: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    email: number
    name: number
    passwordHash: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    name?: true
    passwordHash?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    name?: true
    passwordHash?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    name?: true
    passwordHash?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    email: string
    name: string
    passwordHash: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    uploadedFiles?: boolean | User$uploadedFilesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    authoredTasks?: boolean | User$authoredTasksArgs<ExtArgs>
    authoredTaskChanges?: boolean | User$authoredTaskChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
  }

  export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "email" | "name" | "passwordHash", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploadedFiles?: boolean | User$uploadedFilesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    authoredTasks?: boolean | User$authoredTasksArgs<ExtArgs>
    authoredTaskChanges?: boolean | User$authoredTaskChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      uploadedFiles: Prisma.$UploadedFilePayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      assignedTasks: Prisma.$TaskPayload<ExtArgs>[]
      authoredTasks: Prisma.$TaskPayload<ExtArgs>[]
      authoredTaskChanges: Prisma.$TaskHistoryGroupPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      email: string
      name: string
      passwordHash: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>

  export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadedFiles<T extends User$uploadedFilesArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedFilesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedTasks<T extends User$assignedTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authoredTasks<T extends User$authoredTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$authoredTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authoredTaskChanges<T extends User$authoredTaskChangesArgs<ExtArgs> = {}>(args?: Subset<T, User$authoredTaskChangesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  export interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.uploadedFiles
   */
  export type User$uploadedFilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    where?: UploadedFileWhereInput
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    cursor?: UploadedFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.assignedTasks
   */
  export type User$assignedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.authoredTasks
   */
  export type User$authoredTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.authoredTaskChanges
   */
  export type User$authoredTaskChangesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    where?: TaskHistoryGroupWhereInput
    orderBy?: TaskHistoryGroupOrderByWithRelationInput | TaskHistoryGroupOrderByWithRelationInput[]
    cursor?: TaskHistoryGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskHistoryGroupScalarFieldEnum | TaskHistoryGroupScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    expiresAt: Date | null
    hash: string | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    expiresAt: Date | null
    hash: string | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    expiresAt: number
    hash: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
    hash?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
    hash?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
    hash?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    expiresAt: Date
    hash: string
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    hash?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    hash?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    hash?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    hash?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "createdAt" | "expiresAt" | "hash", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
      expiresAt: Date
      hash: string
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  export type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload, S>

  export type RefreshTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  export interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly hash: FieldRef<"RefreshToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model StoredFile
   */

  export type AggregateStoredFile = {
    _count: StoredFileCountAggregateOutputType | null
    _avg: StoredFileAvgAggregateOutputType | null
    _sum: StoredFileSumAggregateOutputType | null
    _min: StoredFileMinAggregateOutputType | null
    _max: StoredFileMaxAggregateOutputType | null
  }

  export type StoredFileAvgAggregateOutputType = {
    size: number | null
  }

  export type StoredFileSumAggregateOutputType = {
    size: number | null
  }

  export type StoredFileMinAggregateOutputType = {
    id: string | null
    hash: string | null
    size: number | null
    createdAt: Date | null
  }

  export type StoredFileMaxAggregateOutputType = {
    id: string | null
    hash: string | null
    size: number | null
    createdAt: Date | null
  }

  export type StoredFileCountAggregateOutputType = {
    id: number
    hash: number
    size: number
    createdAt: number
    _all: number
  }


  export type StoredFileAvgAggregateInputType = {
    size?: true
  }

  export type StoredFileSumAggregateInputType = {
    size?: true
  }

  export type StoredFileMinAggregateInputType = {
    id?: true
    hash?: true
    size?: true
    createdAt?: true
  }

  export type StoredFileMaxAggregateInputType = {
    id?: true
    hash?: true
    size?: true
    createdAt?: true
  }

  export type StoredFileCountAggregateInputType = {
    id?: true
    hash?: true
    size?: true
    createdAt?: true
    _all?: true
  }

  export type StoredFileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StoredFile to aggregate.
     */
    where?: StoredFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoredFiles to fetch.
     */
    orderBy?: StoredFileOrderByWithRelationInput | StoredFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoredFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoredFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoredFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StoredFiles
    **/
    _count?: true | StoredFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoredFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoredFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoredFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoredFileMaxAggregateInputType
  }

  export type GetStoredFileAggregateType<T extends StoredFileAggregateArgs> = {
        [P in keyof T & keyof AggregateStoredFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStoredFile[P]>
      : GetScalarType<T[P], AggregateStoredFile[P]>
  }




  export type StoredFileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: StoredFileWhereInput
    orderBy?: StoredFileOrderByWithAggregationInput | StoredFileOrderByWithAggregationInput[]
    by: StoredFileScalarFieldEnum[] | StoredFileScalarFieldEnum
    having?: StoredFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoredFileCountAggregateInputType | true
    _avg?: StoredFileAvgAggregateInputType
    _sum?: StoredFileSumAggregateInputType
    _min?: StoredFileMinAggregateInputType
    _max?: StoredFileMaxAggregateInputType
  }

  export type StoredFileGroupByOutputType = {
    id: string
    hash: string
    size: number
    createdAt: Date
    _count: StoredFileCountAggregateOutputType | null
    _avg: StoredFileAvgAggregateOutputType | null
    _sum: StoredFileSumAggregateOutputType | null
    _min: StoredFileMinAggregateOutputType | null
    _max: StoredFileMaxAggregateOutputType | null
  }

  type GetStoredFileGroupByPayload<T extends StoredFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoredFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoredFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoredFileGroupByOutputType[P]>
            : GetScalarType<T[P], StoredFileGroupByOutputType[P]>
        }
      >
    >


  export type StoredFileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    size?: boolean
    createdAt?: boolean
    uploads?: boolean | StoredFile$uploadsArgs<ExtArgs>
    _count?: boolean | StoredFileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storedFile"]>

  export type StoredFileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    size?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["storedFile"]>

  export type StoredFileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    size?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["storedFile"]>

  export type StoredFileSelectScalar = {
    id?: boolean
    hash?: boolean
    size?: boolean
    createdAt?: boolean
  }

  export type StoredFileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hash" | "size" | "createdAt", ExtArgs["result"]["storedFile"]>
  export type StoredFileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploads?: boolean | StoredFile$uploadsArgs<ExtArgs>
    _count?: boolean | StoredFileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StoredFileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type StoredFileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $StoredFilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StoredFile"
    objects: {
      uploads: Prisma.$UploadedFilePayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      hash: string
      size: number
      createdAt: Date
    }, ExtArgs["result"]["storedFile"]>
    composites: {}
  }

  export type StoredFileGetPayload<S extends boolean | null | undefined | StoredFileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StoredFilePayload, S>

  export type StoredFileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<StoredFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoredFileCountAggregateInputType | true
    }

  export interface StoredFileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StoredFile'], meta: { name: 'StoredFile' } }
    /**
     * Find zero or one StoredFile that matches the filter.
     * @param {StoredFileFindUniqueArgs} args - Arguments to find a StoredFile
     * @example
     * // Get one StoredFile
     * const storedFile = await prisma.storedFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoredFileFindUniqueArgs>(args: SelectSubset<T, StoredFileFindUniqueArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StoredFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoredFileFindUniqueOrThrowArgs} args - Arguments to find a StoredFile
     * @example
     * // Get one StoredFile
     * const storedFile = await prisma.storedFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoredFileFindUniqueOrThrowArgs>(args: SelectSubset<T, StoredFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoredFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoredFileFindFirstArgs} args - Arguments to find a StoredFile
     * @example
     * // Get one StoredFile
     * const storedFile = await prisma.storedFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoredFileFindFirstArgs>(args?: SelectSubset<T, StoredFileFindFirstArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoredFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoredFileFindFirstOrThrowArgs} args - Arguments to find a StoredFile
     * @example
     * // Get one StoredFile
     * const storedFile = await prisma.storedFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoredFileFindFirstOrThrowArgs>(args?: SelectSubset<T, StoredFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StoredFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoredFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StoredFiles
     * const storedFiles = await prisma.storedFile.findMany()
     * 
     * // Get first 10 StoredFiles
     * const storedFiles = await prisma.storedFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storedFileWithIdOnly = await prisma.storedFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoredFileFindManyArgs>(args?: SelectSubset<T, StoredFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StoredFile.
     * @param {StoredFileCreateArgs} args - Arguments to create a StoredFile.
     * @example
     * // Create one StoredFile
     * const StoredFile = await prisma.storedFile.create({
     *   data: {
     *     // ... data to create a StoredFile
     *   }
     * })
     * 
     */
    create<T extends StoredFileCreateArgs>(args: SelectSubset<T, StoredFileCreateArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StoredFiles.
     * @param {StoredFileCreateManyArgs} args - Arguments to create many StoredFiles.
     * @example
     * // Create many StoredFiles
     * const storedFile = await prisma.storedFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoredFileCreateManyArgs>(args?: SelectSubset<T, StoredFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StoredFiles and returns the data saved in the database.
     * @param {StoredFileCreateManyAndReturnArgs} args - Arguments to create many StoredFiles.
     * @example
     * // Create many StoredFiles
     * const storedFile = await prisma.storedFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StoredFiles and only return the `id`
     * const storedFileWithIdOnly = await prisma.storedFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoredFileCreateManyAndReturnArgs>(args?: SelectSubset<T, StoredFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StoredFile.
     * @param {StoredFileDeleteArgs} args - Arguments to delete one StoredFile.
     * @example
     * // Delete one StoredFile
     * const StoredFile = await prisma.storedFile.delete({
     *   where: {
     *     // ... filter to delete one StoredFile
     *   }
     * })
     * 
     */
    delete<T extends StoredFileDeleteArgs>(args: SelectSubset<T, StoredFileDeleteArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StoredFile.
     * @param {StoredFileUpdateArgs} args - Arguments to update one StoredFile.
     * @example
     * // Update one StoredFile
     * const storedFile = await prisma.storedFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoredFileUpdateArgs>(args: SelectSubset<T, StoredFileUpdateArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StoredFiles.
     * @param {StoredFileDeleteManyArgs} args - Arguments to filter StoredFiles to delete.
     * @example
     * // Delete a few StoredFiles
     * const { count } = await prisma.storedFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoredFileDeleteManyArgs>(args?: SelectSubset<T, StoredFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoredFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoredFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StoredFiles
     * const storedFile = await prisma.storedFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoredFileUpdateManyArgs>(args: SelectSubset<T, StoredFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoredFiles and returns the data updated in the database.
     * @param {StoredFileUpdateManyAndReturnArgs} args - Arguments to update many StoredFiles.
     * @example
     * // Update many StoredFiles
     * const storedFile = await prisma.storedFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StoredFiles and only return the `id`
     * const storedFileWithIdOnly = await prisma.storedFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoredFileUpdateManyAndReturnArgs>(args: SelectSubset<T, StoredFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StoredFile.
     * @param {StoredFileUpsertArgs} args - Arguments to update or create a StoredFile.
     * @example
     * // Update or create a StoredFile
     * const storedFile = await prisma.storedFile.upsert({
     *   create: {
     *     // ... data to create a StoredFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StoredFile we want to update
     *   }
     * })
     */
    upsert<T extends StoredFileUpsertArgs>(args: SelectSubset<T, StoredFileUpsertArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StoredFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoredFileCountArgs} args - Arguments to filter StoredFiles to count.
     * @example
     * // Count the number of StoredFiles
     * const count = await prisma.storedFile.count({
     *   where: {
     *     // ... the filter for the StoredFiles we want to count
     *   }
     * })
    **/
    count<T extends StoredFileCountArgs>(
      args?: Subset<T, StoredFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoredFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StoredFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoredFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoredFileAggregateArgs>(args: Subset<T, StoredFileAggregateArgs>): Prisma.PrismaPromise<GetStoredFileAggregateType<T>>

    /**
     * Group by StoredFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoredFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoredFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoredFileGroupByArgs['orderBy'] }
        : { orderBy?: StoredFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoredFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoredFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StoredFile model
   */
  readonly fields: StoredFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StoredFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoredFileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploads<T extends StoredFile$uploadsArgs<ExtArgs> = {}>(args?: Subset<T, StoredFile$uploadsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the StoredFile model
   */
  export interface StoredFileFieldRefs {
    readonly id: FieldRef<"StoredFile", 'String'>
    readonly hash: FieldRef<"StoredFile", 'String'>
    readonly size: FieldRef<"StoredFile", 'Int'>
    readonly createdAt: FieldRef<"StoredFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StoredFile findUnique
   */
  export type StoredFileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * Filter, which StoredFile to fetch.
     */
    where: StoredFileWhereUniqueInput
  }

  /**
   * StoredFile findUniqueOrThrow
   */
  export type StoredFileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * Filter, which StoredFile to fetch.
     */
    where: StoredFileWhereUniqueInput
  }

  /**
   * StoredFile findFirst
   */
  export type StoredFileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * Filter, which StoredFile to fetch.
     */
    where?: StoredFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoredFiles to fetch.
     */
    orderBy?: StoredFileOrderByWithRelationInput | StoredFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoredFiles.
     */
    cursor?: StoredFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoredFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoredFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoredFiles.
     */
    distinct?: StoredFileScalarFieldEnum | StoredFileScalarFieldEnum[]
  }

  /**
   * StoredFile findFirstOrThrow
   */
  export type StoredFileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * Filter, which StoredFile to fetch.
     */
    where?: StoredFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoredFiles to fetch.
     */
    orderBy?: StoredFileOrderByWithRelationInput | StoredFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoredFiles.
     */
    cursor?: StoredFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoredFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoredFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoredFiles.
     */
    distinct?: StoredFileScalarFieldEnum | StoredFileScalarFieldEnum[]
  }

  /**
   * StoredFile findMany
   */
  export type StoredFileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * Filter, which StoredFiles to fetch.
     */
    where?: StoredFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoredFiles to fetch.
     */
    orderBy?: StoredFileOrderByWithRelationInput | StoredFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StoredFiles.
     */
    cursor?: StoredFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoredFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoredFiles.
     */
    skip?: number
    distinct?: StoredFileScalarFieldEnum | StoredFileScalarFieldEnum[]
  }

  /**
   * StoredFile create
   */
  export type StoredFileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * The data needed to create a StoredFile.
     */
    data: XOR<StoredFileCreateInput, StoredFileUncheckedCreateInput>
  }

  /**
   * StoredFile createMany
   */
  export type StoredFileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StoredFiles.
     */
    data: StoredFileCreateManyInput | StoredFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoredFile createManyAndReturn
   */
  export type StoredFileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * The data used to create many StoredFiles.
     */
    data: StoredFileCreateManyInput | StoredFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoredFile update
   */
  export type StoredFileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * The data needed to update a StoredFile.
     */
    data: XOR<StoredFileUpdateInput, StoredFileUncheckedUpdateInput>
    /**
     * Choose, which StoredFile to update.
     */
    where: StoredFileWhereUniqueInput
  }

  /**
   * StoredFile updateMany
   */
  export type StoredFileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StoredFiles.
     */
    data: XOR<StoredFileUpdateManyMutationInput, StoredFileUncheckedUpdateManyInput>
    /**
     * Filter which StoredFiles to update
     */
    where?: StoredFileWhereInput
    /**
     * Limit how many StoredFiles to update.
     */
    limit?: number
  }

  /**
   * StoredFile updateManyAndReturn
   */
  export type StoredFileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * The data used to update StoredFiles.
     */
    data: XOR<StoredFileUpdateManyMutationInput, StoredFileUncheckedUpdateManyInput>
    /**
     * Filter which StoredFiles to update
     */
    where?: StoredFileWhereInput
    /**
     * Limit how many StoredFiles to update.
     */
    limit?: number
  }

  /**
   * StoredFile upsert
   */
  export type StoredFileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * The filter to search for the StoredFile to update in case it exists.
     */
    where: StoredFileWhereUniqueInput
    /**
     * In case the StoredFile found by the `where` argument doesn't exist, create a new StoredFile with this data.
     */
    create: XOR<StoredFileCreateInput, StoredFileUncheckedCreateInput>
    /**
     * In case the StoredFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoredFileUpdateInput, StoredFileUncheckedUpdateInput>
  }

  /**
   * StoredFile delete
   */
  export type StoredFileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
    /**
     * Filter which StoredFile to delete.
     */
    where: StoredFileWhereUniqueInput
  }

  /**
   * StoredFile deleteMany
   */
  export type StoredFileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StoredFiles to delete
     */
    where?: StoredFileWhereInput
    /**
     * Limit how many StoredFiles to delete.
     */
    limit?: number
  }

  /**
   * StoredFile.uploads
   */
  export type StoredFile$uploadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    where?: UploadedFileWhereInput
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    cursor?: UploadedFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * StoredFile without action
   */
  export type StoredFileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoredFile
     */
    select?: StoredFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoredFile
     */
    omit?: StoredFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoredFileInclude<ExtArgs> | null
  }


  /**
   * Model UploadedFile
   */

  export type AggregateUploadedFile = {
    _count: UploadedFileCountAggregateOutputType | null
    _min: UploadedFileMinAggregateOutputType | null
    _max: UploadedFileMaxAggregateOutputType | null
  }

  export type UploadedFileMinAggregateOutputType = {
    id: string | null
    originalName: string | null
    mimetype: string | null
    uploadedAt: Date | null
    uploaderId: string | null
    storedFileId: string | null
  }

  export type UploadedFileMaxAggregateOutputType = {
    id: string | null
    originalName: string | null
    mimetype: string | null
    uploadedAt: Date | null
    uploaderId: string | null
    storedFileId: string | null
  }

  export type UploadedFileCountAggregateOutputType = {
    id: number
    originalName: number
    mimetype: number
    uploadedAt: number
    uploaderId: number
    storedFileId: number
    _all: number
  }


  export type UploadedFileMinAggregateInputType = {
    id?: true
    originalName?: true
    mimetype?: true
    uploadedAt?: true
    uploaderId?: true
    storedFileId?: true
  }

  export type UploadedFileMaxAggregateInputType = {
    id?: true
    originalName?: true
    mimetype?: true
    uploadedAt?: true
    uploaderId?: true
    storedFileId?: true
  }

  export type UploadedFileCountAggregateInputType = {
    id?: true
    originalName?: true
    mimetype?: true
    uploadedAt?: true
    uploaderId?: true
    storedFileId?: true
    _all?: true
  }

  export type UploadedFileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedFile to aggregate.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadedFiles
    **/
    _count?: true | UploadedFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadedFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadedFileMaxAggregateInputType
  }

  export type GetUploadedFileAggregateType<T extends UploadedFileAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadedFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadedFile[P]>
      : GetScalarType<T[P], AggregateUploadedFile[P]>
  }




  export type UploadedFileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: UploadedFileWhereInput
    orderBy?: UploadedFileOrderByWithAggregationInput | UploadedFileOrderByWithAggregationInput[]
    by: UploadedFileScalarFieldEnum[] | UploadedFileScalarFieldEnum
    having?: UploadedFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadedFileCountAggregateInputType | true
    _min?: UploadedFileMinAggregateInputType
    _max?: UploadedFileMaxAggregateInputType
  }

  export type UploadedFileGroupByOutputType = {
    id: string
    originalName: string
    mimetype: string
    uploadedAt: Date
    uploaderId: string
    storedFileId: string
    _count: UploadedFileCountAggregateOutputType | null
    _min: UploadedFileMinAggregateOutputType | null
    _max: UploadedFileMaxAggregateOutputType | null
  }

  type GetUploadedFileGroupByPayload<T extends UploadedFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadedFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadedFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadedFileGroupByOutputType[P]>
            : GetScalarType<T[P], UploadedFileGroupByOutputType[P]>
        }
      >
    >


  export type UploadedFileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    mimetype?: boolean
    uploadedAt?: boolean
    uploaderId?: boolean
    storedFileId?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    storedFile?: boolean | StoredFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    mimetype?: boolean
    uploadedAt?: boolean
    uploaderId?: boolean
    storedFileId?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    storedFile?: boolean | StoredFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    mimetype?: boolean
    uploadedAt?: boolean
    uploaderId?: boolean
    storedFileId?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    storedFile?: boolean | StoredFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectScalar = {
    id?: boolean
    originalName?: boolean
    mimetype?: boolean
    uploadedAt?: boolean
    uploaderId?: boolean
    storedFileId?: boolean
  }

  export type UploadedFileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "originalName" | "mimetype" | "uploadedAt" | "uploaderId" | "storedFileId", ExtArgs["result"]["uploadedFile"]>
  export type UploadedFileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    storedFile?: boolean | StoredFileDefaultArgs<ExtArgs>
  }
  export type UploadedFileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    storedFile?: boolean | StoredFileDefaultArgs<ExtArgs>
  }
  export type UploadedFileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    storedFile?: boolean | StoredFileDefaultArgs<ExtArgs>
  }

  export type $UploadedFilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UploadedFile"
    objects: {
      uploader: Prisma.$UserPayload<ExtArgs>
      storedFile: Prisma.$StoredFilePayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      originalName: string
      mimetype: string
      uploadedAt: Date
      uploaderId: string
      storedFileId: string
    }, ExtArgs["result"]["uploadedFile"]>
    composites: {}
  }

  export type UploadedFileGetPayload<S extends boolean | null | undefined | UploadedFileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload, S>

  export type UploadedFileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<UploadedFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadedFileCountAggregateInputType | true
    }

  export interface UploadedFileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadedFile'], meta: { name: 'UploadedFile' } }
    /**
     * Find zero or one UploadedFile that matches the filter.
     * @param {UploadedFileFindUniqueArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadedFileFindUniqueArgs>(args: SelectSubset<T, UploadedFileFindUniqueArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadedFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadedFileFindUniqueOrThrowArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadedFileFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadedFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileFindFirstArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadedFileFindFirstArgs>(args?: SelectSubset<T, UploadedFileFindFirstArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileFindFirstOrThrowArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadedFileFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadedFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadedFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadedFiles
     * const uploadedFiles = await prisma.uploadedFile.findMany()
     * 
     * // Get first 10 UploadedFiles
     * const uploadedFiles = await prisma.uploadedFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadedFileWithIdOnly = await prisma.uploadedFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadedFileFindManyArgs>(args?: SelectSubset<T, UploadedFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadedFile.
     * @param {UploadedFileCreateArgs} args - Arguments to create a UploadedFile.
     * @example
     * // Create one UploadedFile
     * const UploadedFile = await prisma.uploadedFile.create({
     *   data: {
     *     // ... data to create a UploadedFile
     *   }
     * })
     * 
     */
    create<T extends UploadedFileCreateArgs>(args: SelectSubset<T, UploadedFileCreateArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadedFiles.
     * @param {UploadedFileCreateManyArgs} args - Arguments to create many UploadedFiles.
     * @example
     * // Create many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadedFileCreateManyArgs>(args?: SelectSubset<T, UploadedFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadedFiles and returns the data saved in the database.
     * @param {UploadedFileCreateManyAndReturnArgs} args - Arguments to create many UploadedFiles.
     * @example
     * // Create many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadedFiles and only return the `id`
     * const uploadedFileWithIdOnly = await prisma.uploadedFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadedFileCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadedFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UploadedFile.
     * @param {UploadedFileDeleteArgs} args - Arguments to delete one UploadedFile.
     * @example
     * // Delete one UploadedFile
     * const UploadedFile = await prisma.uploadedFile.delete({
     *   where: {
     *     // ... filter to delete one UploadedFile
     *   }
     * })
     * 
     */
    delete<T extends UploadedFileDeleteArgs>(args: SelectSubset<T, UploadedFileDeleteArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadedFile.
     * @param {UploadedFileUpdateArgs} args - Arguments to update one UploadedFile.
     * @example
     * // Update one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadedFileUpdateArgs>(args: SelectSubset<T, UploadedFileUpdateArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadedFiles.
     * @param {UploadedFileDeleteManyArgs} args - Arguments to filter UploadedFiles to delete.
     * @example
     * // Delete a few UploadedFiles
     * const { count } = await prisma.uploadedFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadedFileDeleteManyArgs>(args?: SelectSubset<T, UploadedFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadedFileUpdateManyArgs>(args: SelectSubset<T, UploadedFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedFiles and returns the data updated in the database.
     * @param {UploadedFileUpdateManyAndReturnArgs} args - Arguments to update many UploadedFiles.
     * @example
     * // Update many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadedFiles and only return the `id`
     * const uploadedFileWithIdOnly = await prisma.uploadedFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UploadedFileUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadedFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UploadedFile.
     * @param {UploadedFileUpsertArgs} args - Arguments to update or create a UploadedFile.
     * @example
     * // Update or create a UploadedFile
     * const uploadedFile = await prisma.uploadedFile.upsert({
     *   create: {
     *     // ... data to create a UploadedFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadedFile we want to update
     *   }
     * })
     */
    upsert<T extends UploadedFileUpsertArgs>(args: SelectSubset<T, UploadedFileUpsertArgs<ExtArgs>>): Prisma__UploadedFileClient<runtime.Types.Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadedFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileCountArgs} args - Arguments to filter UploadedFiles to count.
     * @example
     * // Count the number of UploadedFiles
     * const count = await prisma.uploadedFile.count({
     *   where: {
     *     // ... the filter for the UploadedFiles we want to count
     *   }
     * })
    **/
    count<T extends UploadedFileCountArgs>(
      args?: Subset<T, UploadedFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadedFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadedFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UploadedFileAggregateArgs>(args: Subset<T, UploadedFileAggregateArgs>): Prisma.PrismaPromise<GetUploadedFileAggregateType<T>>

    /**
     * Group by UploadedFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UploadedFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadedFileGroupByArgs['orderBy'] }
        : { orderBy?: UploadedFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UploadedFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadedFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadedFile model
   */
  readonly fields: UploadedFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadedFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadedFileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploader<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    storedFile<T extends StoredFileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoredFileDefaultArgs<ExtArgs>>): Prisma__StoredFileClient<runtime.Types.Result.GetResult<Prisma.$StoredFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the UploadedFile model
   */
  export interface UploadedFileFieldRefs {
    readonly id: FieldRef<"UploadedFile", 'String'>
    readonly originalName: FieldRef<"UploadedFile", 'String'>
    readonly mimetype: FieldRef<"UploadedFile", 'String'>
    readonly uploadedAt: FieldRef<"UploadedFile", 'DateTime'>
    readonly uploaderId: FieldRef<"UploadedFile", 'String'>
    readonly storedFileId: FieldRef<"UploadedFile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UploadedFile findUnique
   */
  export type UploadedFileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile findUniqueOrThrow
   */
  export type UploadedFileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile findFirst
   */
  export type UploadedFileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedFiles.
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedFiles.
     */
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * UploadedFile findFirstOrThrow
   */
  export type UploadedFileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedFiles.
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedFiles.
     */
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * UploadedFile findMany
   */
  export type UploadedFileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFiles to fetch.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadedFiles.
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * UploadedFile create
   */
  export type UploadedFileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadedFile.
     */
    data: XOR<UploadedFileCreateInput, UploadedFileUncheckedCreateInput>
  }

  /**
   * UploadedFile createMany
   */
  export type UploadedFileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadedFiles.
     */
    data: UploadedFileCreateManyInput | UploadedFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadedFile createManyAndReturn
   */
  export type UploadedFileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * The data used to create many UploadedFiles.
     */
    data: UploadedFileCreateManyInput | UploadedFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedFile update
   */
  export type UploadedFileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadedFile.
     */
    data: XOR<UploadedFileUpdateInput, UploadedFileUncheckedUpdateInput>
    /**
     * Choose, which UploadedFile to update.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile updateMany
   */
  export type UploadedFileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadedFiles.
     */
    data: XOR<UploadedFileUpdateManyMutationInput, UploadedFileUncheckedUpdateManyInput>
    /**
     * Filter which UploadedFiles to update
     */
    where?: UploadedFileWhereInput
    /**
     * Limit how many UploadedFiles to update.
     */
    limit?: number
  }

  /**
   * UploadedFile updateManyAndReturn
   */
  export type UploadedFileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * The data used to update UploadedFiles.
     */
    data: XOR<UploadedFileUpdateManyMutationInput, UploadedFileUncheckedUpdateManyInput>
    /**
     * Filter which UploadedFiles to update
     */
    where?: UploadedFileWhereInput
    /**
     * Limit how many UploadedFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedFile upsert
   */
  export type UploadedFileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadedFile to update in case it exists.
     */
    where: UploadedFileWhereUniqueInput
    /**
     * In case the UploadedFile found by the `where` argument doesn't exist, create a new UploadedFile with this data.
     */
    create: XOR<UploadedFileCreateInput, UploadedFileUncheckedCreateInput>
    /**
     * In case the UploadedFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadedFileUpdateInput, UploadedFileUncheckedUpdateInput>
  }

  /**
   * UploadedFile delete
   */
  export type UploadedFileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter which UploadedFile to delete.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile deleteMany
   */
  export type UploadedFileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedFiles to delete
     */
    where?: UploadedFileWhereInput
    /**
     * Limit how many UploadedFiles to delete.
     */
    limit?: number
  }

  /**
   * UploadedFile without action
   */
  export type UploadedFileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
  }


  /**
   * Model TaskHistoryValue
   */

  export type AggregateTaskHistoryValue = {
    _count: TaskHistoryValueCountAggregateOutputType | null
    _min: TaskHistoryValueMinAggregateOutputType | null
    _max: TaskHistoryValueMaxAggregateOutputType | null
  }

  export type TaskHistoryValueMinAggregateOutputType = {
    groupId: string | null
    taskId: string | null
    key: $Enums.TaskHistoryKey | null
  }

  export type TaskHistoryValueMaxAggregateOutputType = {
    groupId: string | null
    taskId: string | null
    key: $Enums.TaskHistoryKey | null
  }

  export type TaskHistoryValueCountAggregateOutputType = {
    groupId: number
    taskId: number
    key: number
    value: number
    _all: number
  }


  export type TaskHistoryValueMinAggregateInputType = {
    groupId?: true
    taskId?: true
    key?: true
  }

  export type TaskHistoryValueMaxAggregateInputType = {
    groupId?: true
    taskId?: true
    key?: true
  }

  export type TaskHistoryValueCountAggregateInputType = {
    groupId?: true
    taskId?: true
    key?: true
    value?: true
    _all?: true
  }

  export type TaskHistoryValueAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which TaskHistoryValue to aggregate.
     */
    where?: TaskHistoryValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryValues to fetch.
     */
    orderBy?: TaskHistoryValueOrderByWithRelationInput | TaskHistoryValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskHistoryValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskHistoryValues
    **/
    _count?: true | TaskHistoryValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskHistoryValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskHistoryValueMaxAggregateInputType
  }

  export type GetTaskHistoryValueAggregateType<T extends TaskHistoryValueAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskHistoryValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskHistoryValue[P]>
      : GetScalarType<T[P], AggregateTaskHistoryValue[P]>
  }




  export type TaskHistoryValueGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskHistoryValueWhereInput
    orderBy?: TaskHistoryValueOrderByWithAggregationInput | TaskHistoryValueOrderByWithAggregationInput[]
    by: TaskHistoryValueScalarFieldEnum[] | TaskHistoryValueScalarFieldEnum
    having?: TaskHistoryValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskHistoryValueCountAggregateInputType | true
    _min?: TaskHistoryValueMinAggregateInputType
    _max?: TaskHistoryValueMaxAggregateInputType
  }

  export type TaskHistoryValueGroupByOutputType = {
    groupId: string
    taskId: string
    key: $Enums.TaskHistoryKey
    value: JsonValue
    _count: TaskHistoryValueCountAggregateOutputType | null
    _min: TaskHistoryValueMinAggregateOutputType | null
    _max: TaskHistoryValueMaxAggregateOutputType | null
  }

  type GetTaskHistoryValueGroupByPayload<T extends TaskHistoryValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskHistoryValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskHistoryValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskHistoryValueGroupByOutputType[P]>
            : GetScalarType<T[P], TaskHistoryValueGroupByOutputType[P]>
        }
      >
    >


  export type TaskHistoryValueSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    groupId?: boolean
    taskId?: boolean
    key?: boolean
    value?: boolean
    group?: boolean | TaskHistoryGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskHistoryValue"]>

  export type TaskHistoryValueSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    groupId?: boolean
    taskId?: boolean
    key?: boolean
    value?: boolean
    group?: boolean | TaskHistoryGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskHistoryValue"]>

  export type TaskHistoryValueSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    groupId?: boolean
    taskId?: boolean
    key?: boolean
    value?: boolean
    group?: boolean | TaskHistoryGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskHistoryValue"]>

  export type TaskHistoryValueSelectScalar = {
    groupId?: boolean
    taskId?: boolean
    key?: boolean
    value?: boolean
  }

  export type TaskHistoryValueOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"groupId" | "taskId" | "key" | "value", ExtArgs["result"]["taskHistoryValue"]>
  export type TaskHistoryValueInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    group?: boolean | TaskHistoryGroupDefaultArgs<ExtArgs>
  }
  export type TaskHistoryValueIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    group?: boolean | TaskHistoryGroupDefaultArgs<ExtArgs>
  }
  export type TaskHistoryValueIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    group?: boolean | TaskHistoryGroupDefaultArgs<ExtArgs>
  }

  export type $TaskHistoryValuePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TaskHistoryValue"
    objects: {
      group: Prisma.$TaskHistoryGroupPayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      groupId: string
      taskId: string
      key: $Enums.TaskHistoryKey
      value: Prisma.JsonValue
    }, ExtArgs["result"]["taskHistoryValue"]>
    composites: {}
  }

  export type TaskHistoryValueGetPayload<S extends boolean | null | undefined | TaskHistoryValueDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload, S>

  export type TaskHistoryValueCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<TaskHistoryValueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskHistoryValueCountAggregateInputType | true
    }

  export interface TaskHistoryValueDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskHistoryValue'], meta: { name: 'TaskHistoryValue' } }
    /**
     * Find zero or one TaskHistoryValue that matches the filter.
     * @param {TaskHistoryValueFindUniqueArgs} args - Arguments to find a TaskHistoryValue
     * @example
     * // Get one TaskHistoryValue
     * const taskHistoryValue = await prisma.taskHistoryValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskHistoryValueFindUniqueArgs>(args: SelectSubset<T, TaskHistoryValueFindUniqueArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskHistoryValue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskHistoryValueFindUniqueOrThrowArgs} args - Arguments to find a TaskHistoryValue
     * @example
     * // Get one TaskHistoryValue
     * const taskHistoryValue = await prisma.taskHistoryValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskHistoryValueFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskHistoryValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskHistoryValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryValueFindFirstArgs} args - Arguments to find a TaskHistoryValue
     * @example
     * // Get one TaskHistoryValue
     * const taskHistoryValue = await prisma.taskHistoryValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskHistoryValueFindFirstArgs>(args?: SelectSubset<T, TaskHistoryValueFindFirstArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskHistoryValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryValueFindFirstOrThrowArgs} args - Arguments to find a TaskHistoryValue
     * @example
     * // Get one TaskHistoryValue
     * const taskHistoryValue = await prisma.taskHistoryValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskHistoryValueFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskHistoryValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskHistoryValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskHistoryValues
     * const taskHistoryValues = await prisma.taskHistoryValue.findMany()
     * 
     * // Get first 10 TaskHistoryValues
     * const taskHistoryValues = await prisma.taskHistoryValue.findMany({ take: 10 })
     * 
     * // Only select the `groupId`
     * const taskHistoryValueWithGroupIdOnly = await prisma.taskHistoryValue.findMany({ select: { groupId: true } })
     * 
     */
    findMany<T extends TaskHistoryValueFindManyArgs>(args?: SelectSubset<T, TaskHistoryValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskHistoryValue.
     * @param {TaskHistoryValueCreateArgs} args - Arguments to create a TaskHistoryValue.
     * @example
     * // Create one TaskHistoryValue
     * const TaskHistoryValue = await prisma.taskHistoryValue.create({
     *   data: {
     *     // ... data to create a TaskHistoryValue
     *   }
     * })
     * 
     */
    create<T extends TaskHistoryValueCreateArgs>(args: SelectSubset<T, TaskHistoryValueCreateArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskHistoryValues.
     * @param {TaskHistoryValueCreateManyArgs} args - Arguments to create many TaskHistoryValues.
     * @example
     * // Create many TaskHistoryValues
     * const taskHistoryValue = await prisma.taskHistoryValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskHistoryValueCreateManyArgs>(args?: SelectSubset<T, TaskHistoryValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskHistoryValues and returns the data saved in the database.
     * @param {TaskHistoryValueCreateManyAndReturnArgs} args - Arguments to create many TaskHistoryValues.
     * @example
     * // Create many TaskHistoryValues
     * const taskHistoryValue = await prisma.taskHistoryValue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskHistoryValues and only return the `groupId`
     * const taskHistoryValueWithGroupIdOnly = await prisma.taskHistoryValue.createManyAndReturn({
     *   select: { groupId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskHistoryValueCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskHistoryValueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskHistoryValue.
     * @param {TaskHistoryValueDeleteArgs} args - Arguments to delete one TaskHistoryValue.
     * @example
     * // Delete one TaskHistoryValue
     * const TaskHistoryValue = await prisma.taskHistoryValue.delete({
     *   where: {
     *     // ... filter to delete one TaskHistoryValue
     *   }
     * })
     * 
     */
    delete<T extends TaskHistoryValueDeleteArgs>(args: SelectSubset<T, TaskHistoryValueDeleteArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskHistoryValue.
     * @param {TaskHistoryValueUpdateArgs} args - Arguments to update one TaskHistoryValue.
     * @example
     * // Update one TaskHistoryValue
     * const taskHistoryValue = await prisma.taskHistoryValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskHistoryValueUpdateArgs>(args: SelectSubset<T, TaskHistoryValueUpdateArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskHistoryValues.
     * @param {TaskHistoryValueDeleteManyArgs} args - Arguments to filter TaskHistoryValues to delete.
     * @example
     * // Delete a few TaskHistoryValues
     * const { count } = await prisma.taskHistoryValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskHistoryValueDeleteManyArgs>(args?: SelectSubset<T, TaskHistoryValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskHistoryValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskHistoryValues
     * const taskHistoryValue = await prisma.taskHistoryValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskHistoryValueUpdateManyArgs>(args: SelectSubset<T, TaskHistoryValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskHistoryValues and returns the data updated in the database.
     * @param {TaskHistoryValueUpdateManyAndReturnArgs} args - Arguments to update many TaskHistoryValues.
     * @example
     * // Update many TaskHistoryValues
     * const taskHistoryValue = await prisma.taskHistoryValue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskHistoryValues and only return the `groupId`
     * const taskHistoryValueWithGroupIdOnly = await prisma.taskHistoryValue.updateManyAndReturn({
     *   select: { groupId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskHistoryValueUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskHistoryValueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskHistoryValue.
     * @param {TaskHistoryValueUpsertArgs} args - Arguments to update or create a TaskHistoryValue.
     * @example
     * // Update or create a TaskHistoryValue
     * const taskHistoryValue = await prisma.taskHistoryValue.upsert({
     *   create: {
     *     // ... data to create a TaskHistoryValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskHistoryValue we want to update
     *   }
     * })
     */
    upsert<T extends TaskHistoryValueUpsertArgs>(args: SelectSubset<T, TaskHistoryValueUpsertArgs<ExtArgs>>): Prisma__TaskHistoryValueClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskHistoryValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryValueCountArgs} args - Arguments to filter TaskHistoryValues to count.
     * @example
     * // Count the number of TaskHistoryValues
     * const count = await prisma.taskHistoryValue.count({
     *   where: {
     *     // ... the filter for the TaskHistoryValues we want to count
     *   }
     * })
    **/
    count<T extends TaskHistoryValueCountArgs>(
      args?: Subset<T, TaskHistoryValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskHistoryValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskHistoryValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskHistoryValueAggregateArgs>(args: Subset<T, TaskHistoryValueAggregateArgs>): Prisma.PrismaPromise<GetTaskHistoryValueAggregateType<T>>

    /**
     * Group by TaskHistoryValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryValueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskHistoryValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskHistoryValueGroupByArgs['orderBy'] }
        : { orderBy?: TaskHistoryValueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskHistoryValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskHistoryValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskHistoryValue model
   */
  readonly fields: TaskHistoryValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskHistoryValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskHistoryValueClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends TaskHistoryGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskHistoryGroupDefaultArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskHistoryValue model
   */
  export interface TaskHistoryValueFieldRefs {
    readonly groupId: FieldRef<"TaskHistoryValue", 'String'>
    readonly taskId: FieldRef<"TaskHistoryValue", 'String'>
    readonly key: FieldRef<"TaskHistoryValue", 'TaskHistoryKey'>
    readonly value: FieldRef<"TaskHistoryValue", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * TaskHistoryValue findUnique
   */
  export type TaskHistoryValueFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryValue to fetch.
     */
    where: TaskHistoryValueWhereUniqueInput
  }

  /**
   * TaskHistoryValue findUniqueOrThrow
   */
  export type TaskHistoryValueFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryValue to fetch.
     */
    where: TaskHistoryValueWhereUniqueInput
  }

  /**
   * TaskHistoryValue findFirst
   */
  export type TaskHistoryValueFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryValue to fetch.
     */
    where?: TaskHistoryValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryValues to fetch.
     */
    orderBy?: TaskHistoryValueOrderByWithRelationInput | TaskHistoryValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskHistoryValues.
     */
    cursor?: TaskHistoryValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskHistoryValues.
     */
    distinct?: TaskHistoryValueScalarFieldEnum | TaskHistoryValueScalarFieldEnum[]
  }

  /**
   * TaskHistoryValue findFirstOrThrow
   */
  export type TaskHistoryValueFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryValue to fetch.
     */
    where?: TaskHistoryValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryValues to fetch.
     */
    orderBy?: TaskHistoryValueOrderByWithRelationInput | TaskHistoryValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskHistoryValues.
     */
    cursor?: TaskHistoryValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskHistoryValues.
     */
    distinct?: TaskHistoryValueScalarFieldEnum | TaskHistoryValueScalarFieldEnum[]
  }

  /**
   * TaskHistoryValue findMany
   */
  export type TaskHistoryValueFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryValues to fetch.
     */
    where?: TaskHistoryValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryValues to fetch.
     */
    orderBy?: TaskHistoryValueOrderByWithRelationInput | TaskHistoryValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskHistoryValues.
     */
    cursor?: TaskHistoryValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryValues.
     */
    skip?: number
    distinct?: TaskHistoryValueScalarFieldEnum | TaskHistoryValueScalarFieldEnum[]
  }

  /**
   * TaskHistoryValue create
   */
  export type TaskHistoryValueCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskHistoryValue.
     */
    data: XOR<TaskHistoryValueCreateInput, TaskHistoryValueUncheckedCreateInput>
  }

  /**
   * TaskHistoryValue createMany
   */
  export type TaskHistoryValueCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskHistoryValues.
     */
    data: TaskHistoryValueCreateManyInput | TaskHistoryValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskHistoryValue createManyAndReturn
   */
  export type TaskHistoryValueCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * The data used to create many TaskHistoryValues.
     */
    data: TaskHistoryValueCreateManyInput | TaskHistoryValueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskHistoryValue update
   */
  export type TaskHistoryValueUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskHistoryValue.
     */
    data: XOR<TaskHistoryValueUpdateInput, TaskHistoryValueUncheckedUpdateInput>
    /**
     * Choose, which TaskHistoryValue to update.
     */
    where: TaskHistoryValueWhereUniqueInput
  }

  /**
   * TaskHistoryValue updateMany
   */
  export type TaskHistoryValueUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskHistoryValues.
     */
    data: XOR<TaskHistoryValueUpdateManyMutationInput, TaskHistoryValueUncheckedUpdateManyInput>
    /**
     * Filter which TaskHistoryValues to update
     */
    where?: TaskHistoryValueWhereInput
    /**
     * Limit how many TaskHistoryValues to update.
     */
    limit?: number
  }

  /**
   * TaskHistoryValue updateManyAndReturn
   */
  export type TaskHistoryValueUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * The data used to update TaskHistoryValues.
     */
    data: XOR<TaskHistoryValueUpdateManyMutationInput, TaskHistoryValueUncheckedUpdateManyInput>
    /**
     * Filter which TaskHistoryValues to update
     */
    where?: TaskHistoryValueWhereInput
    /**
     * Limit how many TaskHistoryValues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskHistoryValue upsert
   */
  export type TaskHistoryValueUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskHistoryValue to update in case it exists.
     */
    where: TaskHistoryValueWhereUniqueInput
    /**
     * In case the TaskHistoryValue found by the `where` argument doesn't exist, create a new TaskHistoryValue with this data.
     */
    create: XOR<TaskHistoryValueCreateInput, TaskHistoryValueUncheckedCreateInput>
    /**
     * In case the TaskHistoryValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskHistoryValueUpdateInput, TaskHistoryValueUncheckedUpdateInput>
  }

  /**
   * TaskHistoryValue delete
   */
  export type TaskHistoryValueDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    /**
     * Filter which TaskHistoryValue to delete.
     */
    where: TaskHistoryValueWhereUniqueInput
  }

  /**
   * TaskHistoryValue deleteMany
   */
  export type TaskHistoryValueDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which TaskHistoryValues to delete
     */
    where?: TaskHistoryValueWhereInput
    /**
     * Limit how many TaskHistoryValues to delete.
     */
    limit?: number
  }

  /**
   * TaskHistoryValue without action
   */
  export type TaskHistoryValueDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
  }


  /**
   * Model TaskHistoryGroup
   */

  export type AggregateTaskHistoryGroup = {
    _count: TaskHistoryGroupCountAggregateOutputType | null
    _min: TaskHistoryGroupMinAggregateOutputType | null
    _max: TaskHistoryGroupMaxAggregateOutputType | null
  }

  export type TaskHistoryGroupMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    authorId: string | null
    localCreatedAt: Date | null
    createdAt: Date | null
    createdAtFixReason: $Enums.CreatedAtFixReason | null
  }

  export type TaskHistoryGroupMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    authorId: string | null
    localCreatedAt: Date | null
    createdAt: Date | null
    createdAtFixReason: $Enums.CreatedAtFixReason | null
  }

  export type TaskHistoryGroupCountAggregateOutputType = {
    id: number
    taskId: number
    authorId: number
    localCreatedAt: number
    createdAt: number
    createdAtFixReason: number
    _all: number
  }


  export type TaskHistoryGroupMinAggregateInputType = {
    id?: true
    taskId?: true
    authorId?: true
    localCreatedAt?: true
    createdAt?: true
    createdAtFixReason?: true
  }

  export type TaskHistoryGroupMaxAggregateInputType = {
    id?: true
    taskId?: true
    authorId?: true
    localCreatedAt?: true
    createdAt?: true
    createdAtFixReason?: true
  }

  export type TaskHistoryGroupCountAggregateInputType = {
    id?: true
    taskId?: true
    authorId?: true
    localCreatedAt?: true
    createdAt?: true
    createdAtFixReason?: true
    _all?: true
  }

  export type TaskHistoryGroupAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which TaskHistoryGroup to aggregate.
     */
    where?: TaskHistoryGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryGroups to fetch.
     */
    orderBy?: TaskHistoryGroupOrderByWithRelationInput | TaskHistoryGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskHistoryGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskHistoryGroups
    **/
    _count?: true | TaskHistoryGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskHistoryGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskHistoryGroupMaxAggregateInputType
  }

  export type GetTaskHistoryGroupAggregateType<T extends TaskHistoryGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskHistoryGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskHistoryGroup[P]>
      : GetScalarType<T[P], AggregateTaskHistoryGroup[P]>
  }




  export type TaskHistoryGroupGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskHistoryGroupWhereInput
    orderBy?: TaskHistoryGroupOrderByWithAggregationInput | TaskHistoryGroupOrderByWithAggregationInput[]
    by: TaskHistoryGroupScalarFieldEnum[] | TaskHistoryGroupScalarFieldEnum
    having?: TaskHistoryGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskHistoryGroupCountAggregateInputType | true
    _min?: TaskHistoryGroupMinAggregateInputType
    _max?: TaskHistoryGroupMaxAggregateInputType
  }

  export type TaskHistoryGroupGroupByOutputType = {
    id: string
    taskId: string
    authorId: string
    localCreatedAt: Date
    createdAt: Date
    createdAtFixReason: $Enums.CreatedAtFixReason | null
    _count: TaskHistoryGroupCountAggregateOutputType | null
    _min: TaskHistoryGroupMinAggregateOutputType | null
    _max: TaskHistoryGroupMaxAggregateOutputType | null
  }

  type GetTaskHistoryGroupGroupByPayload<T extends TaskHistoryGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskHistoryGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskHistoryGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskHistoryGroupGroupByOutputType[P]>
            : GetScalarType<T[P], TaskHistoryGroupGroupByOutputType[P]>
        }
      >
    >


  export type TaskHistoryGroupSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    authorId?: boolean
    localCreatedAt?: boolean
    createdAt?: boolean
    createdAtFixReason?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    values?: boolean | TaskHistoryGroup$valuesArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TaskHistoryGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskHistoryGroup"]>

  export type TaskHistoryGroupSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    authorId?: boolean
    localCreatedAt?: boolean
    createdAt?: boolean
    createdAtFixReason?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskHistoryGroup"]>

  export type TaskHistoryGroupSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    authorId?: boolean
    localCreatedAt?: boolean
    createdAt?: boolean
    createdAtFixReason?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskHistoryGroup"]>

  export type TaskHistoryGroupSelectScalar = {
    id?: boolean
    taskId?: boolean
    authorId?: boolean
    localCreatedAt?: boolean
    createdAt?: boolean
    createdAtFixReason?: boolean
  }

  export type TaskHistoryGroupOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "taskId" | "authorId" | "localCreatedAt" | "createdAt" | "createdAtFixReason", ExtArgs["result"]["taskHistoryGroup"]>
  export type TaskHistoryGroupInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    values?: boolean | TaskHistoryGroup$valuesArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TaskHistoryGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskHistoryGroupIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskHistoryGroupIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskHistoryGroupPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TaskHistoryGroup"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      values: Prisma.$TaskHistoryValuePayload<ExtArgs>[]
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      taskId: string
      authorId: string
      localCreatedAt: Date
      createdAt: Date
      createdAtFixReason: $Enums.CreatedAtFixReason | null
    }, ExtArgs["result"]["taskHistoryGroup"]>
    composites: {}
  }

  export type TaskHistoryGroupGetPayload<S extends boolean | null | undefined | TaskHistoryGroupDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload, S>

  export type TaskHistoryGroupCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<TaskHistoryGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskHistoryGroupCountAggregateInputType | true
    }

  export interface TaskHistoryGroupDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskHistoryGroup'], meta: { name: 'TaskHistoryGroup' } }
    /**
     * Find zero or one TaskHistoryGroup that matches the filter.
     * @param {TaskHistoryGroupFindUniqueArgs} args - Arguments to find a TaskHistoryGroup
     * @example
     * // Get one TaskHistoryGroup
     * const taskHistoryGroup = await prisma.taskHistoryGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskHistoryGroupFindUniqueArgs>(args: SelectSubset<T, TaskHistoryGroupFindUniqueArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskHistoryGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskHistoryGroupFindUniqueOrThrowArgs} args - Arguments to find a TaskHistoryGroup
     * @example
     * // Get one TaskHistoryGroup
     * const taskHistoryGroup = await prisma.taskHistoryGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskHistoryGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskHistoryGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskHistoryGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryGroupFindFirstArgs} args - Arguments to find a TaskHistoryGroup
     * @example
     * // Get one TaskHistoryGroup
     * const taskHistoryGroup = await prisma.taskHistoryGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskHistoryGroupFindFirstArgs>(args?: SelectSubset<T, TaskHistoryGroupFindFirstArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskHistoryGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryGroupFindFirstOrThrowArgs} args - Arguments to find a TaskHistoryGroup
     * @example
     * // Get one TaskHistoryGroup
     * const taskHistoryGroup = await prisma.taskHistoryGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskHistoryGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskHistoryGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskHistoryGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskHistoryGroups
     * const taskHistoryGroups = await prisma.taskHistoryGroup.findMany()
     * 
     * // Get first 10 TaskHistoryGroups
     * const taskHistoryGroups = await prisma.taskHistoryGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskHistoryGroupWithIdOnly = await prisma.taskHistoryGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskHistoryGroupFindManyArgs>(args?: SelectSubset<T, TaskHistoryGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskHistoryGroup.
     * @param {TaskHistoryGroupCreateArgs} args - Arguments to create a TaskHistoryGroup.
     * @example
     * // Create one TaskHistoryGroup
     * const TaskHistoryGroup = await prisma.taskHistoryGroup.create({
     *   data: {
     *     // ... data to create a TaskHistoryGroup
     *   }
     * })
     * 
     */
    create<T extends TaskHistoryGroupCreateArgs>(args: SelectSubset<T, TaskHistoryGroupCreateArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskHistoryGroups.
     * @param {TaskHistoryGroupCreateManyArgs} args - Arguments to create many TaskHistoryGroups.
     * @example
     * // Create many TaskHistoryGroups
     * const taskHistoryGroup = await prisma.taskHistoryGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskHistoryGroupCreateManyArgs>(args?: SelectSubset<T, TaskHistoryGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskHistoryGroups and returns the data saved in the database.
     * @param {TaskHistoryGroupCreateManyAndReturnArgs} args - Arguments to create many TaskHistoryGroups.
     * @example
     * // Create many TaskHistoryGroups
     * const taskHistoryGroup = await prisma.taskHistoryGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskHistoryGroups and only return the `id`
     * const taskHistoryGroupWithIdOnly = await prisma.taskHistoryGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskHistoryGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskHistoryGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskHistoryGroup.
     * @param {TaskHistoryGroupDeleteArgs} args - Arguments to delete one TaskHistoryGroup.
     * @example
     * // Delete one TaskHistoryGroup
     * const TaskHistoryGroup = await prisma.taskHistoryGroup.delete({
     *   where: {
     *     // ... filter to delete one TaskHistoryGroup
     *   }
     * })
     * 
     */
    delete<T extends TaskHistoryGroupDeleteArgs>(args: SelectSubset<T, TaskHistoryGroupDeleteArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskHistoryGroup.
     * @param {TaskHistoryGroupUpdateArgs} args - Arguments to update one TaskHistoryGroup.
     * @example
     * // Update one TaskHistoryGroup
     * const taskHistoryGroup = await prisma.taskHistoryGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskHistoryGroupUpdateArgs>(args: SelectSubset<T, TaskHistoryGroupUpdateArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskHistoryGroups.
     * @param {TaskHistoryGroupDeleteManyArgs} args - Arguments to filter TaskHistoryGroups to delete.
     * @example
     * // Delete a few TaskHistoryGroups
     * const { count } = await prisma.taskHistoryGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskHistoryGroupDeleteManyArgs>(args?: SelectSubset<T, TaskHistoryGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskHistoryGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskHistoryGroups
     * const taskHistoryGroup = await prisma.taskHistoryGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskHistoryGroupUpdateManyArgs>(args: SelectSubset<T, TaskHistoryGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskHistoryGroups and returns the data updated in the database.
     * @param {TaskHistoryGroupUpdateManyAndReturnArgs} args - Arguments to update many TaskHistoryGroups.
     * @example
     * // Update many TaskHistoryGroups
     * const taskHistoryGroup = await prisma.taskHistoryGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskHistoryGroups and only return the `id`
     * const taskHistoryGroupWithIdOnly = await prisma.taskHistoryGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskHistoryGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskHistoryGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskHistoryGroup.
     * @param {TaskHistoryGroupUpsertArgs} args - Arguments to update or create a TaskHistoryGroup.
     * @example
     * // Update or create a TaskHistoryGroup
     * const taskHistoryGroup = await prisma.taskHistoryGroup.upsert({
     *   create: {
     *     // ... data to create a TaskHistoryGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskHistoryGroup we want to update
     *   }
     * })
     */
    upsert<T extends TaskHistoryGroupUpsertArgs>(args: SelectSubset<T, TaskHistoryGroupUpsertArgs<ExtArgs>>): Prisma__TaskHistoryGroupClient<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskHistoryGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryGroupCountArgs} args - Arguments to filter TaskHistoryGroups to count.
     * @example
     * // Count the number of TaskHistoryGroups
     * const count = await prisma.taskHistoryGroup.count({
     *   where: {
     *     // ... the filter for the TaskHistoryGroups we want to count
     *   }
     * })
    **/
    count<T extends TaskHistoryGroupCountArgs>(
      args?: Subset<T, TaskHistoryGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskHistoryGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskHistoryGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskHistoryGroupAggregateArgs>(args: Subset<T, TaskHistoryGroupAggregateArgs>): Prisma.PrismaPromise<GetTaskHistoryGroupAggregateType<T>>

    /**
     * Group by TaskHistoryGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskHistoryGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskHistoryGroupGroupByArgs['orderBy'] }
        : { orderBy?: TaskHistoryGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskHistoryGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskHistoryGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskHistoryGroup model
   */
  readonly fields: TaskHistoryGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskHistoryGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskHistoryGroupClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    values<T extends TaskHistoryGroup$valuesArgs<ExtArgs> = {}>(args?: Subset<T, TaskHistoryGroup$valuesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskHistoryGroup model
   */
  export interface TaskHistoryGroupFieldRefs {
    readonly id: FieldRef<"TaskHistoryGroup", 'String'>
    readonly taskId: FieldRef<"TaskHistoryGroup", 'String'>
    readonly authorId: FieldRef<"TaskHistoryGroup", 'String'>
    readonly localCreatedAt: FieldRef<"TaskHistoryGroup", 'DateTime'>
    readonly createdAt: FieldRef<"TaskHistoryGroup", 'DateTime'>
    readonly createdAtFixReason: FieldRef<"TaskHistoryGroup", 'CreatedAtFixReason'>
  }
    

  // Custom InputTypes
  /**
   * TaskHistoryGroup findUnique
   */
  export type TaskHistoryGroupFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryGroup to fetch.
     */
    where: TaskHistoryGroupWhereUniqueInput
  }

  /**
   * TaskHistoryGroup findUniqueOrThrow
   */
  export type TaskHistoryGroupFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryGroup to fetch.
     */
    where: TaskHistoryGroupWhereUniqueInput
  }

  /**
   * TaskHistoryGroup findFirst
   */
  export type TaskHistoryGroupFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryGroup to fetch.
     */
    where?: TaskHistoryGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryGroups to fetch.
     */
    orderBy?: TaskHistoryGroupOrderByWithRelationInput | TaskHistoryGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskHistoryGroups.
     */
    cursor?: TaskHistoryGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskHistoryGroups.
     */
    distinct?: TaskHistoryGroupScalarFieldEnum | TaskHistoryGroupScalarFieldEnum[]
  }

  /**
   * TaskHistoryGroup findFirstOrThrow
   */
  export type TaskHistoryGroupFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryGroup to fetch.
     */
    where?: TaskHistoryGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryGroups to fetch.
     */
    orderBy?: TaskHistoryGroupOrderByWithRelationInput | TaskHistoryGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskHistoryGroups.
     */
    cursor?: TaskHistoryGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskHistoryGroups.
     */
    distinct?: TaskHistoryGroupScalarFieldEnum | TaskHistoryGroupScalarFieldEnum[]
  }

  /**
   * TaskHistoryGroup findMany
   */
  export type TaskHistoryGroupFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * Filter, which TaskHistoryGroups to fetch.
     */
    where?: TaskHistoryGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskHistoryGroups to fetch.
     */
    orderBy?: TaskHistoryGroupOrderByWithRelationInput | TaskHistoryGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskHistoryGroups.
     */
    cursor?: TaskHistoryGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskHistoryGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskHistoryGroups.
     */
    skip?: number
    distinct?: TaskHistoryGroupScalarFieldEnum | TaskHistoryGroupScalarFieldEnum[]
  }

  /**
   * TaskHistoryGroup create
   */
  export type TaskHistoryGroupCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskHistoryGroup.
     */
    data: XOR<TaskHistoryGroupCreateInput, TaskHistoryGroupUncheckedCreateInput>
  }

  /**
   * TaskHistoryGroup createMany
   */
  export type TaskHistoryGroupCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskHistoryGroups.
     */
    data: TaskHistoryGroupCreateManyInput | TaskHistoryGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskHistoryGroup createManyAndReturn
   */
  export type TaskHistoryGroupCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * The data used to create many TaskHistoryGroups.
     */
    data: TaskHistoryGroupCreateManyInput | TaskHistoryGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskHistoryGroup update
   */
  export type TaskHistoryGroupUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskHistoryGroup.
     */
    data: XOR<TaskHistoryGroupUpdateInput, TaskHistoryGroupUncheckedUpdateInput>
    /**
     * Choose, which TaskHistoryGroup to update.
     */
    where: TaskHistoryGroupWhereUniqueInput
  }

  /**
   * TaskHistoryGroup updateMany
   */
  export type TaskHistoryGroupUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskHistoryGroups.
     */
    data: XOR<TaskHistoryGroupUpdateManyMutationInput, TaskHistoryGroupUncheckedUpdateManyInput>
    /**
     * Filter which TaskHistoryGroups to update
     */
    where?: TaskHistoryGroupWhereInput
    /**
     * Limit how many TaskHistoryGroups to update.
     */
    limit?: number
  }

  /**
   * TaskHistoryGroup updateManyAndReturn
   */
  export type TaskHistoryGroupUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * The data used to update TaskHistoryGroups.
     */
    data: XOR<TaskHistoryGroupUpdateManyMutationInput, TaskHistoryGroupUncheckedUpdateManyInput>
    /**
     * Filter which TaskHistoryGroups to update
     */
    where?: TaskHistoryGroupWhereInput
    /**
     * Limit how many TaskHistoryGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskHistoryGroup upsert
   */
  export type TaskHistoryGroupUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskHistoryGroup to update in case it exists.
     */
    where: TaskHistoryGroupWhereUniqueInput
    /**
     * In case the TaskHistoryGroup found by the `where` argument doesn't exist, create a new TaskHistoryGroup with this data.
     */
    create: XOR<TaskHistoryGroupCreateInput, TaskHistoryGroupUncheckedCreateInput>
    /**
     * In case the TaskHistoryGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskHistoryGroupUpdateInput, TaskHistoryGroupUncheckedUpdateInput>
  }

  /**
   * TaskHistoryGroup delete
   */
  export type TaskHistoryGroupDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    /**
     * Filter which TaskHistoryGroup to delete.
     */
    where: TaskHistoryGroupWhereUniqueInput
  }

  /**
   * TaskHistoryGroup deleteMany
   */
  export type TaskHistoryGroupDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which TaskHistoryGroups to delete
     */
    where?: TaskHistoryGroupWhereInput
    /**
     * Limit how many TaskHistoryGroups to delete.
     */
    limit?: number
  }

  /**
   * TaskHistoryGroup.values
   */
  export type TaskHistoryGroup$valuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryValue
     */
    select?: TaskHistoryValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryValue
     */
    omit?: TaskHistoryValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryValueInclude<ExtArgs> | null
    where?: TaskHistoryValueWhereInput
    orderBy?: TaskHistoryValueOrderByWithRelationInput | TaskHistoryValueOrderByWithRelationInput[]
    cursor?: TaskHistoryValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskHistoryValueScalarFieldEnum | TaskHistoryValueScalarFieldEnum[]
  }

  /**
   * TaskHistoryGroup without action
   */
  export type TaskHistoryGroupDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    impact: number | null
    ease: number | null
  }

  export type TaskSumAggregateOutputType = {
    impact: number | null
    ease: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    state: $Enums.TaskState | null
    archived: boolean | null
    impact: number | null
    ease: number | null
    startAfter: Date | null
    plannedStart: Date | null
    dueTo: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
    responsibleId: string | null
    parentId: string | null
    orderKey: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    state: $Enums.TaskState | null
    archived: boolean | null
    impact: number | null
    ease: number | null
    startAfter: Date | null
    plannedStart: Date | null
    dueTo: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
    responsibleId: string | null
    parentId: string | null
    orderKey: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    state: number
    archived: number
    impact: number
    ease: number
    startAfter: number
    plannedStart: number
    dueTo: number
    createdAt: number
    updatedAt: number
    authorId: number
    responsibleId: number
    parentId: number
    orderKey: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    impact?: true
    ease?: true
  }

  export type TaskSumAggregateInputType = {
    impact?: true
    ease?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    state?: true
    archived?: true
    impact?: true
    ease?: true
    startAfter?: true
    plannedStart?: true
    dueTo?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    responsibleId?: true
    parentId?: true
    orderKey?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    state?: true
    archived?: true
    impact?: true
    ease?: true
    startAfter?: true
    plannedStart?: true
    dueTo?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    responsibleId?: true
    parentId?: true
    orderKey?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    state?: true
    archived?: true
    impact?: true
    ease?: true
    startAfter?: true
    plannedStart?: true
    dueTo?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    responsibleId?: true
    parentId?: true
    orderKey?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    state: $Enums.TaskState
    archived: boolean
    impact: number
    ease: number
    startAfter: Date | null
    plannedStart: Date | null
    dueTo: Date | null
    createdAt: Date
    updatedAt: Date
    authorId: string
    responsibleId: string | null
    parentId: string | null
    orderKey: string
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    state?: boolean
    archived?: boolean
    impact?: boolean
    ease?: boolean
    startAfter?: boolean
    plannedStart?: boolean
    dueTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    responsibleId?: boolean
    parentId?: boolean
    orderKey?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    responsible?: boolean | Task$responsibleArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
    children?: boolean | Task$childrenArgs<ExtArgs>
    historyGroups?: boolean | Task$historyGroupsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    state?: boolean
    archived?: boolean
    impact?: boolean
    ease?: boolean
    startAfter?: boolean
    plannedStart?: boolean
    dueTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    responsibleId?: boolean
    parentId?: boolean
    orderKey?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    responsible?: boolean | Task$responsibleArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    state?: boolean
    archived?: boolean
    impact?: boolean
    ease?: boolean
    startAfter?: boolean
    plannedStart?: boolean
    dueTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    responsibleId?: boolean
    parentId?: boolean
    orderKey?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    responsible?: boolean | Task$responsibleArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    state?: boolean
    archived?: boolean
    impact?: boolean
    ease?: boolean
    startAfter?: boolean
    plannedStart?: boolean
    dueTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    responsibleId?: boolean
    parentId?: boolean
    orderKey?: boolean
  }

  export type TaskOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "state" | "archived" | "impact" | "ease" | "startAfter" | "plannedStart" | "dueTo" | "createdAt" | "updatedAt" | "authorId" | "responsibleId" | "parentId" | "orderKey", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    responsible?: boolean | Task$responsibleArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
    children?: boolean | Task$childrenArgs<ExtArgs>
    historyGroups?: boolean | Task$historyGroupsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    responsible?: boolean | Task$responsibleArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    responsible?: boolean | Task$responsibleArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      responsible: Prisma.$UserPayload<ExtArgs> | null
      parent: Prisma.$TaskPayload<ExtArgs> | null
      children: Prisma.$TaskPayload<ExtArgs>[]
      historyGroups: Prisma.$TaskHistoryGroupPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      title: string
      state: $Enums.TaskState
      archived: boolean
      impact: number
      ease: number
      startAfter: Date | null
      plannedStart: Date | null
      dueTo: Date | null
      createdAt: Date
      updatedAt: Date
      authorId: string
      responsibleId: string | null
      parentId: string | null
      orderKey: string
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  export type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TaskPayload, S>

  export type TaskCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    responsible<T extends Task$responsibleArgs<ExtArgs> = {}>(args?: Subset<T, Task$responsibleArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parent<T extends Task$parentArgs<ExtArgs> = {}>(args?: Subset<T, Task$parentArgs<ExtArgs>>): Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Task$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Task$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historyGroups<T extends Task$historyGroupsArgs<ExtArgs> = {}>(args?: Subset<T, Task$historyGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskHistoryGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  export interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly state: FieldRef<"Task", 'TaskState'>
    readonly archived: FieldRef<"Task", 'Boolean'>
    readonly impact: FieldRef<"Task", 'Float'>
    readonly ease: FieldRef<"Task", 'Float'>
    readonly startAfter: FieldRef<"Task", 'DateTime'>
    readonly plannedStart: FieldRef<"Task", 'DateTime'>
    readonly dueTo: FieldRef<"Task", 'DateTime'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly authorId: FieldRef<"Task", 'String'>
    readonly responsibleId: FieldRef<"Task", 'String'>
    readonly parentId: FieldRef<"Task", 'String'>
    readonly orderKey: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.responsible
   */
  export type Task$responsibleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task.parent
   */
  export type Task$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * Task.children
   */
  export type Task$childrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task.historyGroups
   */
  export type Task$historyGroupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskHistoryGroup
     */
    select?: TaskHistoryGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskHistoryGroup
     */
    omit?: TaskHistoryGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryGroupInclude<ExtArgs> | null
    where?: TaskHistoryGroupWhereInput
    orderBy?: TaskHistoryGroupOrderByWithRelationInput | TaskHistoryGroupOrderByWithRelationInput[]
    cursor?: TaskHistoryGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskHistoryGroupScalarFieldEnum | TaskHistoryGroupScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  } as const)

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash'
  } as const

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    hash: 'hash'
  } as const

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const StoredFileScalarFieldEnum = {
    id: 'id',
    hash: 'hash',
    size: 'size',
    createdAt: 'createdAt'
  } as const

  export type StoredFileScalarFieldEnum = (typeof StoredFileScalarFieldEnum)[keyof typeof StoredFileScalarFieldEnum]


  export const UploadedFileScalarFieldEnum = {
    id: 'id',
    originalName: 'originalName',
    mimetype: 'mimetype',
    uploadedAt: 'uploadedAt',
    uploaderId: 'uploaderId',
    storedFileId: 'storedFileId'
  } as const

  export type UploadedFileScalarFieldEnum = (typeof UploadedFileScalarFieldEnum)[keyof typeof UploadedFileScalarFieldEnum]


  export const TaskHistoryValueScalarFieldEnum = {
    groupId: 'groupId',
    taskId: 'taskId',
    key: 'key',
    value: 'value'
  } as const

  export type TaskHistoryValueScalarFieldEnum = (typeof TaskHistoryValueScalarFieldEnum)[keyof typeof TaskHistoryValueScalarFieldEnum]


  export const TaskHistoryGroupScalarFieldEnum = {
    id: 'id',
    taskId: 'taskId',
    authorId: 'authorId',
    localCreatedAt: 'localCreatedAt',
    createdAt: 'createdAt',
    createdAtFixReason: 'createdAtFixReason'
  } as const

  export type TaskHistoryGroupScalarFieldEnum = (typeof TaskHistoryGroupScalarFieldEnum)[keyof typeof TaskHistoryGroupScalarFieldEnum]


  export const TaskScalarFieldEnum = {
    id: 'id',
    title: 'title',
    state: 'state',
    archived: 'archived',
    impact: 'impact',
    ease: 'ease',
    startAfter: 'startAfter',
    plannedStart: 'plannedStart',
    dueTo: 'dueTo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    authorId: 'authorId',
    responsibleId: 'responsibleId',
    parentId: 'parentId',
    orderKey: 'orderKey'
  } as const

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
  } as const

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput = {
    JsonNull: JsonNull
  } as const

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
  } as const

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
  } as const

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder = {
    first: 'first',
    last: 'last'
  } as const

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TaskHistoryKey'
   */
  export type EnumTaskHistoryKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskHistoryKey'>
    


  /**
   * Reference to a field of type 'TaskHistoryKey[]'
   */
  export type ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskHistoryKey[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'CreatedAtFixReason'
   */
  export type EnumCreatedAtFixReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreatedAtFixReason'>
    


  /**
   * Reference to a field of type 'CreatedAtFixReason[]'
   */
  export type ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreatedAtFixReason[]'>
    


  /**
   * Reference to a field of type 'TaskState'
   */
  export type EnumTaskStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskState'>
    


  /**
   * Reference to a field of type 'TaskState[]'
   */
  export type ListEnumTaskStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskState[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    uploadedFiles?: UploadedFileListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    assignedTasks?: TaskListRelationFilter
    authoredTasks?: TaskListRelationFilter
    authoredTaskChanges?: TaskHistoryGroupListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    uploadedFiles?: UploadedFileOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    assignedTasks?: TaskOrderByRelationAggregateInput
    authoredTasks?: TaskOrderByRelationAggregateInput
    authoredTaskChanges?: TaskHistoryGroupOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    name?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    passwordHash?: StringFilter<"User"> | string
    uploadedFiles?: UploadedFileListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    assignedTasks?: TaskListRelationFilter
    authoredTasks?: TaskListRelationFilter
    authoredTaskChanges?: TaskHistoryGroupListRelationFilter
  }, "id" | "email" | "name">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    hash?: StringFilter<"RefreshToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    hash?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: UuidFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    hash?: StringFilter<"RefreshToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    hash?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RefreshToken"> | string
    userId?: UuidWithAggregatesFilter<"RefreshToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    hash?: StringWithAggregatesFilter<"RefreshToken"> | string
  }

  export type StoredFileWhereInput = {
    AND?: StoredFileWhereInput | StoredFileWhereInput[]
    OR?: StoredFileWhereInput[]
    NOT?: StoredFileWhereInput | StoredFileWhereInput[]
    id?: UuidFilter<"StoredFile"> | string
    hash?: StringFilter<"StoredFile"> | string
    size?: IntFilter<"StoredFile"> | number
    createdAt?: DateTimeFilter<"StoredFile"> | Date | string
    uploads?: UploadedFileListRelationFilter
  }

  export type StoredFileOrderByWithRelationInput = {
    id?: SortOrder
    hash?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    uploads?: UploadedFileOrderByRelationAggregateInput
  }

  export type StoredFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StoredFileWhereInput | StoredFileWhereInput[]
    OR?: StoredFileWhereInput[]
    NOT?: StoredFileWhereInput | StoredFileWhereInput[]
    hash?: StringFilter<"StoredFile"> | string
    size?: IntFilter<"StoredFile"> | number
    createdAt?: DateTimeFilter<"StoredFile"> | Date | string
    uploads?: UploadedFileListRelationFilter
  }, "id">

  export type StoredFileOrderByWithAggregationInput = {
    id?: SortOrder
    hash?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    _count?: StoredFileCountOrderByAggregateInput
    _avg?: StoredFileAvgOrderByAggregateInput
    _max?: StoredFileMaxOrderByAggregateInput
    _min?: StoredFileMinOrderByAggregateInput
    _sum?: StoredFileSumOrderByAggregateInput
  }

  export type StoredFileScalarWhereWithAggregatesInput = {
    AND?: StoredFileScalarWhereWithAggregatesInput | StoredFileScalarWhereWithAggregatesInput[]
    OR?: StoredFileScalarWhereWithAggregatesInput[]
    NOT?: StoredFileScalarWhereWithAggregatesInput | StoredFileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"StoredFile"> | string
    hash?: StringWithAggregatesFilter<"StoredFile"> | string
    size?: IntWithAggregatesFilter<"StoredFile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"StoredFile"> | Date | string
  }

  export type UploadedFileWhereInput = {
    AND?: UploadedFileWhereInput | UploadedFileWhereInput[]
    OR?: UploadedFileWhereInput[]
    NOT?: UploadedFileWhereInput | UploadedFileWhereInput[]
    id?: StringFilter<"UploadedFile"> | string
    originalName?: StringFilter<"UploadedFile"> | string
    mimetype?: StringFilter<"UploadedFile"> | string
    uploadedAt?: DateTimeFilter<"UploadedFile"> | Date | string
    uploaderId?: UuidFilter<"UploadedFile"> | string
    storedFileId?: UuidFilter<"UploadedFile"> | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    storedFile?: XOR<StoredFileScalarRelationFilter, StoredFileWhereInput>
  }

  export type UploadedFileOrderByWithRelationInput = {
    id?: SortOrder
    originalName?: SortOrder
    mimetype?: SortOrder
    uploadedAt?: SortOrder
    uploaderId?: SortOrder
    storedFileId?: SortOrder
    uploader?: UserOrderByWithRelationInput
    storedFile?: StoredFileOrderByWithRelationInput
  }

  export type UploadedFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadedFileWhereInput | UploadedFileWhereInput[]
    OR?: UploadedFileWhereInput[]
    NOT?: UploadedFileWhereInput | UploadedFileWhereInput[]
    originalName?: StringFilter<"UploadedFile"> | string
    mimetype?: StringFilter<"UploadedFile"> | string
    uploadedAt?: DateTimeFilter<"UploadedFile"> | Date | string
    uploaderId?: UuidFilter<"UploadedFile"> | string
    storedFileId?: UuidFilter<"UploadedFile"> | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    storedFile?: XOR<StoredFileScalarRelationFilter, StoredFileWhereInput>
  }, "id">

  export type UploadedFileOrderByWithAggregationInput = {
    id?: SortOrder
    originalName?: SortOrder
    mimetype?: SortOrder
    uploadedAt?: SortOrder
    uploaderId?: SortOrder
    storedFileId?: SortOrder
    _count?: UploadedFileCountOrderByAggregateInput
    _max?: UploadedFileMaxOrderByAggregateInput
    _min?: UploadedFileMinOrderByAggregateInput
  }

  export type UploadedFileScalarWhereWithAggregatesInput = {
    AND?: UploadedFileScalarWhereWithAggregatesInput | UploadedFileScalarWhereWithAggregatesInput[]
    OR?: UploadedFileScalarWhereWithAggregatesInput[]
    NOT?: UploadedFileScalarWhereWithAggregatesInput | UploadedFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadedFile"> | string
    originalName?: StringWithAggregatesFilter<"UploadedFile"> | string
    mimetype?: StringWithAggregatesFilter<"UploadedFile"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"UploadedFile"> | Date | string
    uploaderId?: UuidWithAggregatesFilter<"UploadedFile"> | string
    storedFileId?: UuidWithAggregatesFilter<"UploadedFile"> | string
  }

  export type TaskHistoryValueWhereInput = {
    AND?: TaskHistoryValueWhereInput | TaskHistoryValueWhereInput[]
    OR?: TaskHistoryValueWhereInput[]
    NOT?: TaskHistoryValueWhereInput | TaskHistoryValueWhereInput[]
    groupId?: UuidFilter<"TaskHistoryValue"> | string
    taskId?: UuidFilter<"TaskHistoryValue"> | string
    key?: EnumTaskHistoryKeyFilter<"TaskHistoryValue"> | $Enums.TaskHistoryKey
    value?: JsonFilter<"TaskHistoryValue">
    group?: XOR<TaskHistoryGroupScalarRelationFilter, TaskHistoryGroupWhereInput>
  }

  export type TaskHistoryValueOrderByWithRelationInput = {
    groupId?: SortOrder
    taskId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: TaskHistoryGroupOrderByWithRelationInput
  }

  export type TaskHistoryValueWhereUniqueInput = Prisma.AtLeast<{
    groupId_key?: TaskHistoryValueGroupIdKeyCompoundUniqueInput
    AND?: TaskHistoryValueWhereInput | TaskHistoryValueWhereInput[]
    OR?: TaskHistoryValueWhereInput[]
    NOT?: TaskHistoryValueWhereInput | TaskHistoryValueWhereInput[]
    groupId?: UuidFilter<"TaskHistoryValue"> | string
    taskId?: UuidFilter<"TaskHistoryValue"> | string
    key?: EnumTaskHistoryKeyFilter<"TaskHistoryValue"> | $Enums.TaskHistoryKey
    value?: JsonFilter<"TaskHistoryValue">
    group?: XOR<TaskHistoryGroupScalarRelationFilter, TaskHistoryGroupWhereInput>
  }, "groupId_key">

  export type TaskHistoryValueOrderByWithAggregationInput = {
    groupId?: SortOrder
    taskId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    _count?: TaskHistoryValueCountOrderByAggregateInput
    _max?: TaskHistoryValueMaxOrderByAggregateInput
    _min?: TaskHistoryValueMinOrderByAggregateInput
  }

  export type TaskHistoryValueScalarWhereWithAggregatesInput = {
    AND?: TaskHistoryValueScalarWhereWithAggregatesInput | TaskHistoryValueScalarWhereWithAggregatesInput[]
    OR?: TaskHistoryValueScalarWhereWithAggregatesInput[]
    NOT?: TaskHistoryValueScalarWhereWithAggregatesInput | TaskHistoryValueScalarWhereWithAggregatesInput[]
    groupId?: UuidWithAggregatesFilter<"TaskHistoryValue"> | string
    taskId?: UuidWithAggregatesFilter<"TaskHistoryValue"> | string
    key?: EnumTaskHistoryKeyWithAggregatesFilter<"TaskHistoryValue"> | $Enums.TaskHistoryKey
    value?: JsonWithAggregatesFilter<"TaskHistoryValue">
  }

  export type TaskHistoryGroupWhereInput = {
    AND?: TaskHistoryGroupWhereInput | TaskHistoryGroupWhereInput[]
    OR?: TaskHistoryGroupWhereInput[]
    NOT?: TaskHistoryGroupWhereInput | TaskHistoryGroupWhereInput[]
    id?: UuidFilter<"TaskHistoryGroup"> | string
    taskId?: UuidFilter<"TaskHistoryGroup"> | string
    authorId?: UuidFilter<"TaskHistoryGroup"> | string
    localCreatedAt?: DateTimeFilter<"TaskHistoryGroup"> | Date | string
    createdAt?: DateTimeFilter<"TaskHistoryGroup"> | Date | string
    createdAtFixReason?: EnumCreatedAtFixReasonNullableFilter<"TaskHistoryGroup"> | $Enums.CreatedAtFixReason | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    values?: TaskHistoryValueListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskHistoryGroupOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    localCreatedAt?: SortOrder
    createdAt?: SortOrder
    createdAtFixReason?: SortOrderInput | SortOrder
    task?: TaskOrderByWithRelationInput
    values?: TaskHistoryValueOrderByRelationAggregateInput
    author?: UserOrderByWithRelationInput
  }

  export type TaskHistoryGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskHistoryGroupWhereInput | TaskHistoryGroupWhereInput[]
    OR?: TaskHistoryGroupWhereInput[]
    NOT?: TaskHistoryGroupWhereInput | TaskHistoryGroupWhereInput[]
    taskId?: UuidFilter<"TaskHistoryGroup"> | string
    authorId?: UuidFilter<"TaskHistoryGroup"> | string
    localCreatedAt?: DateTimeFilter<"TaskHistoryGroup"> | Date | string
    createdAt?: DateTimeFilter<"TaskHistoryGroup"> | Date | string
    createdAtFixReason?: EnumCreatedAtFixReasonNullableFilter<"TaskHistoryGroup"> | $Enums.CreatedAtFixReason | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    values?: TaskHistoryValueListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskHistoryGroupOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    localCreatedAt?: SortOrder
    createdAt?: SortOrder
    createdAtFixReason?: SortOrderInput | SortOrder
    _count?: TaskHistoryGroupCountOrderByAggregateInput
    _max?: TaskHistoryGroupMaxOrderByAggregateInput
    _min?: TaskHistoryGroupMinOrderByAggregateInput
  }

  export type TaskHistoryGroupScalarWhereWithAggregatesInput = {
    AND?: TaskHistoryGroupScalarWhereWithAggregatesInput | TaskHistoryGroupScalarWhereWithAggregatesInput[]
    OR?: TaskHistoryGroupScalarWhereWithAggregatesInput[]
    NOT?: TaskHistoryGroupScalarWhereWithAggregatesInput | TaskHistoryGroupScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"TaskHistoryGroup"> | string
    taskId?: UuidWithAggregatesFilter<"TaskHistoryGroup"> | string
    authorId?: UuidWithAggregatesFilter<"TaskHistoryGroup"> | string
    localCreatedAt?: DateTimeWithAggregatesFilter<"TaskHistoryGroup"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TaskHistoryGroup"> | Date | string
    createdAtFixReason?: EnumCreatedAtFixReasonNullableWithAggregatesFilter<"TaskHistoryGroup"> | $Enums.CreatedAtFixReason | null
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: UuidFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    state?: EnumTaskStateFilter<"Task"> | $Enums.TaskState
    archived?: BoolFilter<"Task"> | boolean
    impact?: FloatFilter<"Task"> | number
    ease?: FloatFilter<"Task"> | number
    startAfter?: DateTimeNullableFilter<"Task"> | Date | string | null
    plannedStart?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueTo?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    authorId?: UuidFilter<"Task"> | string
    responsibleId?: UuidNullableFilter<"Task"> | string | null
    parentId?: UuidNullableFilter<"Task"> | string | null
    orderKey?: StringFilter<"Task"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    responsible?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    parent?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    children?: TaskListRelationFilter
    historyGroups?: TaskHistoryGroupListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    state?: SortOrder
    archived?: SortOrder
    impact?: SortOrder
    ease?: SortOrder
    startAfter?: SortOrderInput | SortOrder
    plannedStart?: SortOrderInput | SortOrder
    dueTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    responsibleId?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    orderKey?: SortOrder
    author?: UserOrderByWithRelationInput
    responsible?: UserOrderByWithRelationInput
    parent?: TaskOrderByWithRelationInput
    children?: TaskOrderByRelationAggregateInput
    historyGroups?: TaskHistoryGroupOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    state?: EnumTaskStateFilter<"Task"> | $Enums.TaskState
    archived?: BoolFilter<"Task"> | boolean
    impact?: FloatFilter<"Task"> | number
    ease?: FloatFilter<"Task"> | number
    startAfter?: DateTimeNullableFilter<"Task"> | Date | string | null
    plannedStart?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueTo?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    authorId?: UuidFilter<"Task"> | string
    responsibleId?: UuidNullableFilter<"Task"> | string | null
    parentId?: UuidNullableFilter<"Task"> | string | null
    orderKey?: StringFilter<"Task"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    responsible?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    parent?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    children?: TaskListRelationFilter
    historyGroups?: TaskHistoryGroupListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    state?: SortOrder
    archived?: SortOrder
    impact?: SortOrder
    ease?: SortOrder
    startAfter?: SortOrderInput | SortOrder
    plannedStart?: SortOrderInput | SortOrder
    dueTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    responsibleId?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    orderKey?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    state?: EnumTaskStateWithAggregatesFilter<"Task"> | $Enums.TaskState
    archived?: BoolWithAggregatesFilter<"Task"> | boolean
    impact?: FloatWithAggregatesFilter<"Task"> | number
    ease?: FloatWithAggregatesFilter<"Task"> | number
    startAfter?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    plannedStart?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    dueTo?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    authorId?: UuidWithAggregatesFilter<"Task"> | string
    responsibleId?: UuidNullableWithAggregatesFilter<"Task"> | string | null
    parentId?: UuidNullableWithAggregatesFilter<"Task"> | string | null
    orderKey?: StringWithAggregatesFilter<"Task"> | string
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskUncheckedCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUncheckedUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    createdAt?: Date | string
    expiresAt: Date | string
    hash: string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    expiresAt: Date | string
    hash: string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    expiresAt: Date | string
    hash: string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type StoredFileCreateInput = {
    id?: string
    hash: string
    size: number
    createdAt?: Date | string
    uploads?: UploadedFileCreateNestedManyWithoutStoredFileInput
  }

  export type StoredFileUncheckedCreateInput = {
    id?: string
    hash: string
    size: number
    createdAt?: Date | string
    uploads?: UploadedFileUncheckedCreateNestedManyWithoutStoredFileInput
  }

  export type StoredFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploads?: UploadedFileUpdateManyWithoutStoredFileNestedInput
  }

  export type StoredFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploads?: UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput
  }

  export type StoredFileCreateManyInput = {
    id?: string
    hash: string
    size: number
    createdAt?: Date | string
  }

  export type StoredFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoredFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileCreateInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    uploader: UserCreateNestedOneWithoutUploadedFilesInput
    storedFile: StoredFileCreateNestedOneWithoutUploadsInput
  }

  export type UploadedFileUncheckedCreateInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    uploaderId: string
    storedFileId: string
  }

  export type UploadedFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: UserUpdateOneRequiredWithoutUploadedFilesNestedInput
    storedFile?: StoredFileUpdateOneRequiredWithoutUploadsNestedInput
  }

  export type UploadedFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    storedFileId?: StringFieldUpdateOperationsInput | string
  }

  export type UploadedFileCreateManyInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    uploaderId: string
    storedFileId: string
  }

  export type UploadedFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    storedFileId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskHistoryValueCreateInput = {
    taskId: string
    key: $Enums.TaskHistoryKey
    value: JsonNullValueInput | InputJsonValue
    group: TaskHistoryGroupCreateNestedOneWithoutValuesInput
  }

  export type TaskHistoryValueUncheckedCreateInput = {
    groupId: string
    taskId: string
    key: $Enums.TaskHistoryKey
    value: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueUpdateInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    key?: EnumTaskHistoryKeyFieldUpdateOperationsInput | $Enums.TaskHistoryKey
    value?: JsonNullValueInput | InputJsonValue
    group?: TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput
  }

  export type TaskHistoryValueUncheckedUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    key?: EnumTaskHistoryKeyFieldUpdateOperationsInput | $Enums.TaskHistoryKey
    value?: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueCreateManyInput = {
    groupId: string
    taskId: string
    key: $Enums.TaskHistoryKey
    value: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueUpdateManyMutationInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    key?: EnumTaskHistoryKeyFieldUpdateOperationsInput | $Enums.TaskHistoryKey
    value?: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueUncheckedUpdateManyInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    key?: EnumTaskHistoryKeyFieldUpdateOperationsInput | $Enums.TaskHistoryKey
    value?: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryGroupCreateInput = {
    id?: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
    task: TaskCreateNestedOneWithoutHistoryGroupsInput
    values?: TaskHistoryValueCreateNestedManyWithoutGroupInput
    author: UserCreateNestedOneWithoutAuthoredTaskChangesInput
  }

  export type TaskHistoryGroupUncheckedCreateInput = {
    id?: string
    taskId: string
    authorId: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput
  }

  export type TaskHistoryGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
    task?: TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput
    values?: TaskHistoryValueUpdateManyWithoutGroupNestedInput
    author?: UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput
  }

  export type TaskHistoryGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type TaskHistoryGroupCreateManyInput = {
    id?: string
    taskId: string
    authorId: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
  }

  export type TaskHistoryGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
  }

  export type TaskHistoryGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderKey: string
    author: UserCreateNestedOneWithoutAuthoredTasksInput
    responsible?: UserCreateNestedOneWithoutAssignedTasksInput
    parent?: TaskCreateNestedOneWithoutChildrenInput
    children?: TaskCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    responsibleId?: string | null
    parentId?: string | null
    orderKey: string
    children?: TaskUncheckedCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderKey?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutAuthoredTasksNestedInput
    responsible?: UserUpdateOneWithoutAssignedTasksNestedInput
    parent?: TaskUpdateOneWithoutChildrenNestedInput
    children?: TaskUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
    children?: TaskUncheckedUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    responsibleId?: string | null
    parentId?: string | null
    orderKey: string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderKey?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UploadedFileListRelationFilter = {
    every?: UploadedFileWhereInput
    some?: UploadedFileWhereInput
    none?: UploadedFileWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskHistoryGroupListRelationFilter = {
    every?: TaskHistoryGroupWhereInput
    some?: TaskHistoryGroupWhereInput
    none?: TaskHistoryGroupWhereInput
  }

  export type UploadedFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskHistoryGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    hash?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    hash?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    hash?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StoredFileCountOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type StoredFileAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type StoredFileMaxOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type StoredFileMinOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type StoredFileSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StoredFileScalarRelationFilter = {
    is?: StoredFileWhereInput
    isNot?: StoredFileWhereInput
  }

  export type UploadedFileCountOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    mimetype?: SortOrder
    uploadedAt?: SortOrder
    uploaderId?: SortOrder
    storedFileId?: SortOrder
  }

  export type UploadedFileMaxOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    mimetype?: SortOrder
    uploadedAt?: SortOrder
    uploaderId?: SortOrder
    storedFileId?: SortOrder
  }

  export type UploadedFileMinOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    mimetype?: SortOrder
    uploadedAt?: SortOrder
    uploaderId?: SortOrder
    storedFileId?: SortOrder
  }

  export type EnumTaskHistoryKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryKey | EnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskHistoryKeyFilter<$PrismaModel> | $Enums.TaskHistoryKey
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TaskHistoryGroupScalarRelationFilter = {
    is?: TaskHistoryGroupWhereInput
    isNot?: TaskHistoryGroupWhereInput
  }

  export type TaskHistoryValueGroupIdKeyCompoundUniqueInput = {
    groupId: string
    key: $Enums.TaskHistoryKey
  }

  export type TaskHistoryValueCountOrderByAggregateInput = {
    groupId?: SortOrder
    taskId?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type TaskHistoryValueMaxOrderByAggregateInput = {
    groupId?: SortOrder
    taskId?: SortOrder
    key?: SortOrder
  }

  export type TaskHistoryValueMinOrderByAggregateInput = {
    groupId?: SortOrder
    taskId?: SortOrder
    key?: SortOrder
  }

  export type EnumTaskHistoryKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryKey | EnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskHistoryKeyWithAggregatesFilter<$PrismaModel> | $Enums.TaskHistoryKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskHistoryKeyFilter<$PrismaModel>
    _max?: NestedEnumTaskHistoryKeyFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumCreatedAtFixReasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatedAtFixReason | EnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCreatedAtFixReasonNullableFilter<$PrismaModel> | $Enums.CreatedAtFixReason | null
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskHistoryValueListRelationFilter = {
    every?: TaskHistoryValueWhereInput
    some?: TaskHistoryValueWhereInput
    none?: TaskHistoryValueWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskHistoryValueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskHistoryGroupCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    localCreatedAt?: SortOrder
    createdAt?: SortOrder
    createdAtFixReason?: SortOrder
  }

  export type TaskHistoryGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    localCreatedAt?: SortOrder
    createdAt?: SortOrder
    createdAtFixReason?: SortOrder
  }

  export type TaskHistoryGroupMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    localCreatedAt?: SortOrder
    createdAt?: SortOrder
    createdAtFixReason?: SortOrder
  }

  export type EnumCreatedAtFixReasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatedAtFixReason | EnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCreatedAtFixReasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.CreatedAtFixReason | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCreatedAtFixReasonNullableFilter<$PrismaModel>
    _max?: NestedEnumCreatedAtFixReasonNullableFilter<$PrismaModel>
  }

  export type EnumTaskStateFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateFilter<$PrismaModel> | $Enums.TaskState
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskNullableScalarRelationFilter = {
    is?: TaskWhereInput | null
    isNot?: TaskWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    state?: SortOrder
    archived?: SortOrder
    impact?: SortOrder
    ease?: SortOrder
    startAfter?: SortOrder
    plannedStart?: SortOrder
    dueTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    responsibleId?: SortOrder
    parentId?: SortOrder
    orderKey?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    impact?: SortOrder
    ease?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    state?: SortOrder
    archived?: SortOrder
    impact?: SortOrder
    ease?: SortOrder
    startAfter?: SortOrder
    plannedStart?: SortOrder
    dueTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    responsibleId?: SortOrder
    parentId?: SortOrder
    orderKey?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    state?: SortOrder
    archived?: SortOrder
    impact?: SortOrder
    ease?: SortOrder
    startAfter?: SortOrder
    plannedStart?: SortOrder
    dueTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    responsibleId?: SortOrder
    parentId?: SortOrder
    orderKey?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    impact?: SortOrder
    ease?: SortOrder
  }

  export type EnumTaskStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateWithAggregatesFilter<$PrismaModel> | $Enums.TaskState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStateFilter<$PrismaModel>
    _max?: NestedEnumTaskStateFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UploadedFileCreateNestedManyWithoutUploaderInput = {
    create?: XOR<UploadedFileCreateWithoutUploaderInput, UploadedFileUncheckedCreateWithoutUploaderInput> | UploadedFileCreateWithoutUploaderInput[] | UploadedFileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutUploaderInput | UploadedFileCreateOrConnectWithoutUploaderInput[]
    createMany?: UploadedFileCreateManyUploaderInputEnvelope
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutResponsibleInput = {
    create?: XOR<TaskCreateWithoutResponsibleInput, TaskUncheckedCreateWithoutResponsibleInput> | TaskCreateWithoutResponsibleInput[] | TaskUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutResponsibleInput | TaskCreateOrConnectWithoutResponsibleInput[]
    createMany?: TaskCreateManyResponsibleInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TaskCreateWithoutAuthorInput, TaskUncheckedCreateWithoutAuthorInput> | TaskCreateWithoutAuthorInput[] | TaskUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAuthorInput | TaskCreateOrConnectWithoutAuthorInput[]
    createMany?: TaskCreateManyAuthorInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskHistoryGroupCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutAuthorInput, TaskHistoryGroupUncheckedCreateWithoutAuthorInput> | TaskHistoryGroupCreateWithoutAuthorInput[] | TaskHistoryGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutAuthorInput | TaskHistoryGroupCreateOrConnectWithoutAuthorInput[]
    createMany?: TaskHistoryGroupCreateManyAuthorInputEnvelope
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
  }

  export type UploadedFileUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: XOR<UploadedFileCreateWithoutUploaderInput, UploadedFileUncheckedCreateWithoutUploaderInput> | UploadedFileCreateWithoutUploaderInput[] | UploadedFileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutUploaderInput | UploadedFileCreateOrConnectWithoutUploaderInput[]
    createMany?: UploadedFileCreateManyUploaderInputEnvelope
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutResponsibleInput = {
    create?: XOR<TaskCreateWithoutResponsibleInput, TaskUncheckedCreateWithoutResponsibleInput> | TaskCreateWithoutResponsibleInput[] | TaskUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutResponsibleInput | TaskCreateOrConnectWithoutResponsibleInput[]
    createMany?: TaskCreateManyResponsibleInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TaskCreateWithoutAuthorInput, TaskUncheckedCreateWithoutAuthorInput> | TaskCreateWithoutAuthorInput[] | TaskUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAuthorInput | TaskCreateOrConnectWithoutAuthorInput[]
    createMany?: TaskCreateManyAuthorInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutAuthorInput, TaskHistoryGroupUncheckedCreateWithoutAuthorInput> | TaskHistoryGroupCreateWithoutAuthorInput[] | TaskHistoryGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutAuthorInput | TaskHistoryGroupCreateOrConnectWithoutAuthorInput[]
    createMany?: TaskHistoryGroupCreateManyAuthorInputEnvelope
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UploadedFileUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<UploadedFileCreateWithoutUploaderInput, UploadedFileUncheckedCreateWithoutUploaderInput> | UploadedFileCreateWithoutUploaderInput[] | UploadedFileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutUploaderInput | UploadedFileCreateOrConnectWithoutUploaderInput[]
    upsert?: UploadedFileUpsertWithWhereUniqueWithoutUploaderInput | UploadedFileUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: UploadedFileCreateManyUploaderInputEnvelope
    set?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    disconnect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    delete?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    update?: UploadedFileUpdateWithWhereUniqueWithoutUploaderInput | UploadedFileUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: UploadedFileUpdateManyWithWhereWithoutUploaderInput | UploadedFileUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutResponsibleNestedInput = {
    create?: XOR<TaskCreateWithoutResponsibleInput, TaskUncheckedCreateWithoutResponsibleInput> | TaskCreateWithoutResponsibleInput[] | TaskUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutResponsibleInput | TaskCreateOrConnectWithoutResponsibleInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutResponsibleInput | TaskUpsertWithWhereUniqueWithoutResponsibleInput[]
    createMany?: TaskCreateManyResponsibleInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutResponsibleInput | TaskUpdateWithWhereUniqueWithoutResponsibleInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutResponsibleInput | TaskUpdateManyWithWhereWithoutResponsibleInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TaskCreateWithoutAuthorInput, TaskUncheckedCreateWithoutAuthorInput> | TaskCreateWithoutAuthorInput[] | TaskUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAuthorInput | TaskCreateOrConnectWithoutAuthorInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAuthorInput | TaskUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TaskCreateManyAuthorInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAuthorInput | TaskUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAuthorInput | TaskUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskHistoryGroupUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutAuthorInput, TaskHistoryGroupUncheckedCreateWithoutAuthorInput> | TaskHistoryGroupCreateWithoutAuthorInput[] | TaskHistoryGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutAuthorInput | TaskHistoryGroupCreateOrConnectWithoutAuthorInput[]
    upsert?: TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput | TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TaskHistoryGroupCreateManyAuthorInputEnvelope
    set?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    disconnect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    delete?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    update?: TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput | TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput | TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TaskHistoryGroupScalarWhereInput | TaskHistoryGroupScalarWhereInput[]
  }

  export type UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<UploadedFileCreateWithoutUploaderInput, UploadedFileUncheckedCreateWithoutUploaderInput> | UploadedFileCreateWithoutUploaderInput[] | UploadedFileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutUploaderInput | UploadedFileCreateOrConnectWithoutUploaderInput[]
    upsert?: UploadedFileUpsertWithWhereUniqueWithoutUploaderInput | UploadedFileUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: UploadedFileCreateManyUploaderInputEnvelope
    set?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    disconnect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    delete?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    update?: UploadedFileUpdateWithWhereUniqueWithoutUploaderInput | UploadedFileUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: UploadedFileUpdateManyWithWhereWithoutUploaderInput | UploadedFileUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutResponsibleNestedInput = {
    create?: XOR<TaskCreateWithoutResponsibleInput, TaskUncheckedCreateWithoutResponsibleInput> | TaskCreateWithoutResponsibleInput[] | TaskUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutResponsibleInput | TaskCreateOrConnectWithoutResponsibleInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutResponsibleInput | TaskUpsertWithWhereUniqueWithoutResponsibleInput[]
    createMany?: TaskCreateManyResponsibleInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutResponsibleInput | TaskUpdateWithWhereUniqueWithoutResponsibleInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutResponsibleInput | TaskUpdateManyWithWhereWithoutResponsibleInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TaskCreateWithoutAuthorInput, TaskUncheckedCreateWithoutAuthorInput> | TaskCreateWithoutAuthorInput[] | TaskUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAuthorInput | TaskCreateOrConnectWithoutAuthorInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAuthorInput | TaskUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TaskCreateManyAuthorInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAuthorInput | TaskUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAuthorInput | TaskUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutAuthorInput, TaskHistoryGroupUncheckedCreateWithoutAuthorInput> | TaskHistoryGroupCreateWithoutAuthorInput[] | TaskHistoryGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutAuthorInput | TaskHistoryGroupCreateOrConnectWithoutAuthorInput[]
    upsert?: TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput | TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TaskHistoryGroupCreateManyAuthorInputEnvelope
    set?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    disconnect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    delete?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    update?: TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput | TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput | TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TaskHistoryGroupScalarWhereInput | TaskHistoryGroupScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UploadedFileCreateNestedManyWithoutStoredFileInput = {
    create?: XOR<UploadedFileCreateWithoutStoredFileInput, UploadedFileUncheckedCreateWithoutStoredFileInput> | UploadedFileCreateWithoutStoredFileInput[] | UploadedFileUncheckedCreateWithoutStoredFileInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutStoredFileInput | UploadedFileCreateOrConnectWithoutStoredFileInput[]
    createMany?: UploadedFileCreateManyStoredFileInputEnvelope
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
  }

  export type UploadedFileUncheckedCreateNestedManyWithoutStoredFileInput = {
    create?: XOR<UploadedFileCreateWithoutStoredFileInput, UploadedFileUncheckedCreateWithoutStoredFileInput> | UploadedFileCreateWithoutStoredFileInput[] | UploadedFileUncheckedCreateWithoutStoredFileInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutStoredFileInput | UploadedFileCreateOrConnectWithoutStoredFileInput[]
    createMany?: UploadedFileCreateManyStoredFileInputEnvelope
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UploadedFileUpdateManyWithoutStoredFileNestedInput = {
    create?: XOR<UploadedFileCreateWithoutStoredFileInput, UploadedFileUncheckedCreateWithoutStoredFileInput> | UploadedFileCreateWithoutStoredFileInput[] | UploadedFileUncheckedCreateWithoutStoredFileInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutStoredFileInput | UploadedFileCreateOrConnectWithoutStoredFileInput[]
    upsert?: UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput | UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput[]
    createMany?: UploadedFileCreateManyStoredFileInputEnvelope
    set?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    disconnect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    delete?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    update?: UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput | UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput[]
    updateMany?: UploadedFileUpdateManyWithWhereWithoutStoredFileInput | UploadedFileUpdateManyWithWhereWithoutStoredFileInput[]
    deleteMany?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
  }

  export type UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput = {
    create?: XOR<UploadedFileCreateWithoutStoredFileInput, UploadedFileUncheckedCreateWithoutStoredFileInput> | UploadedFileCreateWithoutStoredFileInput[] | UploadedFileUncheckedCreateWithoutStoredFileInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutStoredFileInput | UploadedFileCreateOrConnectWithoutStoredFileInput[]
    upsert?: UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput | UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput[]
    createMany?: UploadedFileCreateManyStoredFileInputEnvelope
    set?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    disconnect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    delete?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    update?: UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput | UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput[]
    updateMany?: UploadedFileUpdateManyWithWhereWithoutStoredFileInput | UploadedFileUpdateManyWithWhereWithoutStoredFileInput[]
    deleteMany?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUploadedFilesInput = {
    create?: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedFilesInput
    connect?: UserWhereUniqueInput
  }

  export type StoredFileCreateNestedOneWithoutUploadsInput = {
    create?: XOR<StoredFileCreateWithoutUploadsInput, StoredFileUncheckedCreateWithoutUploadsInput>
    connectOrCreate?: StoredFileCreateOrConnectWithoutUploadsInput
    connect?: StoredFileWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUploadedFilesNestedInput = {
    create?: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedFilesInput
    upsert?: UserUpsertWithoutUploadedFilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedFilesInput, UserUpdateWithoutUploadedFilesInput>, UserUncheckedUpdateWithoutUploadedFilesInput>
  }

  export type StoredFileUpdateOneRequiredWithoutUploadsNestedInput = {
    create?: XOR<StoredFileCreateWithoutUploadsInput, StoredFileUncheckedCreateWithoutUploadsInput>
    connectOrCreate?: StoredFileCreateOrConnectWithoutUploadsInput
    upsert?: StoredFileUpsertWithoutUploadsInput
    connect?: StoredFileWhereUniqueInput
    update?: XOR<XOR<StoredFileUpdateToOneWithWhereWithoutUploadsInput, StoredFileUpdateWithoutUploadsInput>, StoredFileUncheckedUpdateWithoutUploadsInput>
  }

  export type TaskHistoryGroupCreateNestedOneWithoutValuesInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutValuesInput, TaskHistoryGroupUncheckedCreateWithoutValuesInput>
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutValuesInput
    connect?: TaskHistoryGroupWhereUniqueInput
  }

  export type EnumTaskHistoryKeyFieldUpdateOperationsInput = {
    set?: $Enums.TaskHistoryKey
  }

  export type TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutValuesInput, TaskHistoryGroupUncheckedCreateWithoutValuesInput>
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutValuesInput
    upsert?: TaskHistoryGroupUpsertWithoutValuesInput
    connect?: TaskHistoryGroupWhereUniqueInput
    update?: XOR<XOR<TaskHistoryGroupUpdateToOneWithWhereWithoutValuesInput, TaskHistoryGroupUpdateWithoutValuesInput>, TaskHistoryGroupUncheckedUpdateWithoutValuesInput>
  }

  export type TaskCreateNestedOneWithoutHistoryGroupsInput = {
    create?: XOR<TaskCreateWithoutHistoryGroupsInput, TaskUncheckedCreateWithoutHistoryGroupsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutHistoryGroupsInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskHistoryValueCreateNestedManyWithoutGroupInput = {
    create?: XOR<TaskHistoryValueCreateWithoutGroupInput, TaskHistoryValueUncheckedCreateWithoutGroupInput> | TaskHistoryValueCreateWithoutGroupInput[] | TaskHistoryValueUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: TaskHistoryValueCreateOrConnectWithoutGroupInput | TaskHistoryValueCreateOrConnectWithoutGroupInput[]
    createMany?: TaskHistoryValueCreateManyGroupInputEnvelope
    connect?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutAuthoredTaskChangesInput = {
    create?: XOR<UserCreateWithoutAuthoredTaskChangesInput, UserUncheckedCreateWithoutAuthoredTaskChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredTaskChangesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<TaskHistoryValueCreateWithoutGroupInput, TaskHistoryValueUncheckedCreateWithoutGroupInput> | TaskHistoryValueCreateWithoutGroupInput[] | TaskHistoryValueUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: TaskHistoryValueCreateOrConnectWithoutGroupInput | TaskHistoryValueCreateOrConnectWithoutGroupInput[]
    createMany?: TaskHistoryValueCreateManyGroupInputEnvelope
    connect?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
  }

  export type NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput = {
    set?: $Enums.CreatedAtFixReason | null
  }

  export type TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput = {
    create?: XOR<TaskCreateWithoutHistoryGroupsInput, TaskUncheckedCreateWithoutHistoryGroupsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutHistoryGroupsInput
    upsert?: TaskUpsertWithoutHistoryGroupsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutHistoryGroupsInput, TaskUpdateWithoutHistoryGroupsInput>, TaskUncheckedUpdateWithoutHistoryGroupsInput>
  }

  export type TaskHistoryValueUpdateManyWithoutGroupNestedInput = {
    create?: XOR<TaskHistoryValueCreateWithoutGroupInput, TaskHistoryValueUncheckedCreateWithoutGroupInput> | TaskHistoryValueCreateWithoutGroupInput[] | TaskHistoryValueUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: TaskHistoryValueCreateOrConnectWithoutGroupInput | TaskHistoryValueCreateOrConnectWithoutGroupInput[]
    upsert?: TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput | TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: TaskHistoryValueCreateManyGroupInputEnvelope
    set?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    disconnect?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    delete?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    connect?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    update?: TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput | TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: TaskHistoryValueUpdateManyWithWhereWithoutGroupInput | TaskHistoryValueUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: TaskHistoryValueScalarWhereInput | TaskHistoryValueScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput = {
    create?: XOR<UserCreateWithoutAuthoredTaskChangesInput, UserUncheckedCreateWithoutAuthoredTaskChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredTaskChangesInput
    upsert?: UserUpsertWithoutAuthoredTaskChangesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthoredTaskChangesInput, UserUpdateWithoutAuthoredTaskChangesInput>, UserUncheckedUpdateWithoutAuthoredTaskChangesInput>
  }

  export type TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<TaskHistoryValueCreateWithoutGroupInput, TaskHistoryValueUncheckedCreateWithoutGroupInput> | TaskHistoryValueCreateWithoutGroupInput[] | TaskHistoryValueUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: TaskHistoryValueCreateOrConnectWithoutGroupInput | TaskHistoryValueCreateOrConnectWithoutGroupInput[]
    upsert?: TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput | TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: TaskHistoryValueCreateManyGroupInputEnvelope
    set?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    disconnect?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    delete?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    connect?: TaskHistoryValueWhereUniqueInput | TaskHistoryValueWhereUniqueInput[]
    update?: TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput | TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: TaskHistoryValueUpdateManyWithWhereWithoutGroupInput | TaskHistoryValueUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: TaskHistoryValueScalarWhereInput | TaskHistoryValueScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuthoredTasksInput = {
    create?: XOR<UserCreateWithoutAuthoredTasksInput, UserUncheckedCreateWithoutAuthoredTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredTasksInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedTasksInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutChildrenInput = {
    create?: XOR<TaskCreateWithoutChildrenInput, TaskUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: TaskCreateOrConnectWithoutChildrenInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutParentInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskHistoryGroupCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutTaskInput, TaskHistoryGroupUncheckedCreateWithoutTaskInput> | TaskHistoryGroupCreateWithoutTaskInput[] | TaskHistoryGroupUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutTaskInput | TaskHistoryGroupCreateOrConnectWithoutTaskInput[]
    createMany?: TaskHistoryGroupCreateManyTaskInputEnvelope
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutTaskInput, TaskHistoryGroupUncheckedCreateWithoutTaskInput> | TaskHistoryGroupCreateWithoutTaskInput[] | TaskHistoryGroupUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutTaskInput | TaskHistoryGroupCreateOrConnectWithoutTaskInput[]
    createMany?: TaskHistoryGroupCreateManyTaskInputEnvelope
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
  }

  export type EnumTaskStateFieldUpdateOperationsInput = {
    set?: $Enums.TaskState
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAuthoredTasksNestedInput = {
    create?: XOR<UserCreateWithoutAuthoredTasksInput, UserUncheckedCreateWithoutAuthoredTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredTasksInput
    upsert?: UserUpsertWithoutAuthoredTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthoredTasksInput, UserUpdateWithoutAuthoredTasksInput>, UserUncheckedUpdateWithoutAuthoredTasksInput>
  }

  export type UserUpdateOneWithoutAssignedTasksNestedInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    upsert?: UserUpsertWithoutAssignedTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedTasksInput, UserUpdateWithoutAssignedTasksInput>, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type TaskUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<TaskCreateWithoutChildrenInput, TaskUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: TaskCreateOrConnectWithoutChildrenInput
    upsert?: TaskUpsertWithoutChildrenInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutChildrenInput, TaskUpdateWithoutChildrenInput>, TaskUncheckedUpdateWithoutChildrenInput>
  }

  export type TaskUpdateManyWithoutParentNestedInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutParentInput | TaskUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutParentInput | TaskUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutParentInput | TaskUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskHistoryGroupUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutTaskInput, TaskHistoryGroupUncheckedCreateWithoutTaskInput> | TaskHistoryGroupCreateWithoutTaskInput[] | TaskHistoryGroupUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutTaskInput | TaskHistoryGroupCreateOrConnectWithoutTaskInput[]
    upsert?: TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput | TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskHistoryGroupCreateManyTaskInputEnvelope
    set?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    disconnect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    delete?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    update?: TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput | TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput | TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskHistoryGroupScalarWhereInput | TaskHistoryGroupScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TaskUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutParentInput | TaskUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutParentInput | TaskUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutParentInput | TaskUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskHistoryGroupUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskHistoryGroupCreateWithoutTaskInput, TaskHistoryGroupUncheckedCreateWithoutTaskInput> | TaskHistoryGroupCreateWithoutTaskInput[] | TaskHistoryGroupUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutTaskInput | TaskHistoryGroupCreateOrConnectWithoutTaskInput[]
    upsert?: TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput | TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskHistoryGroupCreateManyTaskInputEnvelope
    set?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    disconnect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    delete?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    connect?: TaskHistoryGroupWhereUniqueInput | TaskHistoryGroupWhereUniqueInput[]
    update?: TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput | TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput | TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskHistoryGroupScalarWhereInput | TaskHistoryGroupScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTaskHistoryKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryKey | EnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskHistoryKeyFilter<$PrismaModel> | $Enums.TaskHistoryKey
  }

  export type NestedEnumTaskHistoryKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryKey | EnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskHistoryKey[] | ListEnumTaskHistoryKeyFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskHistoryKeyWithAggregatesFilter<$PrismaModel> | $Enums.TaskHistoryKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskHistoryKeyFilter<$PrismaModel>
    _max?: NestedEnumTaskHistoryKeyFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumCreatedAtFixReasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatedAtFixReason | EnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCreatedAtFixReasonNullableFilter<$PrismaModel> | $Enums.CreatedAtFixReason | null
  }

  export type NestedEnumCreatedAtFixReasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatedAtFixReason | EnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CreatedAtFixReason[] | ListEnumCreatedAtFixReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCreatedAtFixReasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.CreatedAtFixReason | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCreatedAtFixReasonNullableFilter<$PrismaModel>
    _max?: NestedEnumCreatedAtFixReasonNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTaskStateFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateFilter<$PrismaModel> | $Enums.TaskState
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumTaskStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateWithAggregatesFilter<$PrismaModel> | $Enums.TaskState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStateFilter<$PrismaModel>
    _max?: NestedEnumTaskStateFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UploadedFileCreateWithoutUploaderInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    storedFile: StoredFileCreateNestedOneWithoutUploadsInput
  }

  export type UploadedFileUncheckedCreateWithoutUploaderInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    storedFileId: string
  }

  export type UploadedFileCreateOrConnectWithoutUploaderInput = {
    where: UploadedFileWhereUniqueInput
    create: XOR<UploadedFileCreateWithoutUploaderInput, UploadedFileUncheckedCreateWithoutUploaderInput>
  }

  export type UploadedFileCreateManyUploaderInputEnvelope = {
    data: UploadedFileCreateManyUploaderInput | UploadedFileCreateManyUploaderInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    expiresAt: Date | string
    hash: string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    expiresAt: Date | string
    hash: string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutResponsibleInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderKey: string
    author: UserCreateNestedOneWithoutAuthoredTasksInput
    parent?: TaskCreateNestedOneWithoutChildrenInput
    children?: TaskCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutResponsibleInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    parentId?: string | null
    orderKey: string
    children?: TaskUncheckedCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutResponsibleInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutResponsibleInput, TaskUncheckedCreateWithoutResponsibleInput>
  }

  export type TaskCreateManyResponsibleInputEnvelope = {
    data: TaskCreateManyResponsibleInput | TaskCreateManyResponsibleInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutAuthorInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderKey: string
    responsible?: UserCreateNestedOneWithoutAssignedTasksInput
    parent?: TaskCreateNestedOneWithoutChildrenInput
    children?: TaskCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    responsibleId?: string | null
    parentId?: string | null
    orderKey: string
    children?: TaskUncheckedCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAuthorInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAuthorInput, TaskUncheckedCreateWithoutAuthorInput>
  }

  export type TaskCreateManyAuthorInputEnvelope = {
    data: TaskCreateManyAuthorInput | TaskCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type TaskHistoryGroupCreateWithoutAuthorInput = {
    id?: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
    task: TaskCreateNestedOneWithoutHistoryGroupsInput
    values?: TaskHistoryValueCreateNestedManyWithoutGroupInput
  }

  export type TaskHistoryGroupUncheckedCreateWithoutAuthorInput = {
    id?: string
    taskId: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput
  }

  export type TaskHistoryGroupCreateOrConnectWithoutAuthorInput = {
    where: TaskHistoryGroupWhereUniqueInput
    create: XOR<TaskHistoryGroupCreateWithoutAuthorInput, TaskHistoryGroupUncheckedCreateWithoutAuthorInput>
  }

  export type TaskHistoryGroupCreateManyAuthorInputEnvelope = {
    data: TaskHistoryGroupCreateManyAuthorInput | TaskHistoryGroupCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type UploadedFileUpsertWithWhereUniqueWithoutUploaderInput = {
    where: UploadedFileWhereUniqueInput
    update: XOR<UploadedFileUpdateWithoutUploaderInput, UploadedFileUncheckedUpdateWithoutUploaderInput>
    create: XOR<UploadedFileCreateWithoutUploaderInput, UploadedFileUncheckedCreateWithoutUploaderInput>
  }

  export type UploadedFileUpdateWithWhereUniqueWithoutUploaderInput = {
    where: UploadedFileWhereUniqueInput
    data: XOR<UploadedFileUpdateWithoutUploaderInput, UploadedFileUncheckedUpdateWithoutUploaderInput>
  }

  export type UploadedFileUpdateManyWithWhereWithoutUploaderInput = {
    where: UploadedFileScalarWhereInput
    data: XOR<UploadedFileUpdateManyMutationInput, UploadedFileUncheckedUpdateManyWithoutUploaderInput>
  }

  export type UploadedFileScalarWhereInput = {
    AND?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
    OR?: UploadedFileScalarWhereInput[]
    NOT?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
    id?: StringFilter<"UploadedFile"> | string
    originalName?: StringFilter<"UploadedFile"> | string
    mimetype?: StringFilter<"UploadedFile"> | string
    uploadedAt?: DateTimeFilter<"UploadedFile"> | Date | string
    uploaderId?: UuidFilter<"UploadedFile"> | string
    storedFileId?: UuidFilter<"UploadedFile"> | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    hash?: StringFilter<"RefreshToken"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutResponsibleInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutResponsibleInput, TaskUncheckedUpdateWithoutResponsibleInput>
    create: XOR<TaskCreateWithoutResponsibleInput, TaskUncheckedCreateWithoutResponsibleInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutResponsibleInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutResponsibleInput, TaskUncheckedUpdateWithoutResponsibleInput>
  }

  export type TaskUpdateManyWithWhereWithoutResponsibleInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutResponsibleInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: UuidFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    state?: EnumTaskStateFilter<"Task"> | $Enums.TaskState
    archived?: BoolFilter<"Task"> | boolean
    impact?: FloatFilter<"Task"> | number
    ease?: FloatFilter<"Task"> | number
    startAfter?: DateTimeNullableFilter<"Task"> | Date | string | null
    plannedStart?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueTo?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    authorId?: UuidFilter<"Task"> | string
    responsibleId?: UuidNullableFilter<"Task"> | string | null
    parentId?: UuidNullableFilter<"Task"> | string | null
    orderKey?: StringFilter<"Task"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutAuthorInput, TaskUncheckedUpdateWithoutAuthorInput>
    create: XOR<TaskCreateWithoutAuthorInput, TaskUncheckedCreateWithoutAuthorInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutAuthorInput, TaskUncheckedUpdateWithoutAuthorInput>
  }

  export type TaskUpdateManyWithWhereWithoutAuthorInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutAuthorInput>
  }

  export type TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TaskHistoryGroupWhereUniqueInput
    update: XOR<TaskHistoryGroupUpdateWithoutAuthorInput, TaskHistoryGroupUncheckedUpdateWithoutAuthorInput>
    create: XOR<TaskHistoryGroupCreateWithoutAuthorInput, TaskHistoryGroupUncheckedCreateWithoutAuthorInput>
  }

  export type TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TaskHistoryGroupWhereUniqueInput
    data: XOR<TaskHistoryGroupUpdateWithoutAuthorInput, TaskHistoryGroupUncheckedUpdateWithoutAuthorInput>
  }

  export type TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput = {
    where: TaskHistoryGroupScalarWhereInput
    data: XOR<TaskHistoryGroupUpdateManyMutationInput, TaskHistoryGroupUncheckedUpdateManyWithoutAuthorInput>
  }

  export type TaskHistoryGroupScalarWhereInput = {
    AND?: TaskHistoryGroupScalarWhereInput | TaskHistoryGroupScalarWhereInput[]
    OR?: TaskHistoryGroupScalarWhereInput[]
    NOT?: TaskHistoryGroupScalarWhereInput | TaskHistoryGroupScalarWhereInput[]
    id?: UuidFilter<"TaskHistoryGroup"> | string
    taskId?: UuidFilter<"TaskHistoryGroup"> | string
    authorId?: UuidFilter<"TaskHistoryGroup"> | string
    localCreatedAt?: DateTimeFilter<"TaskHistoryGroup"> | Date | string
    createdAt?: DateTimeFilter<"TaskHistoryGroup"> | Date | string
    createdAtFixReason?: EnumCreatedAtFixReasonNullableFilter<"TaskHistoryGroup"> | $Enums.CreatedAtFixReason | null
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput
    assignedTasks?: TaskCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskUncheckedCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput
    assignedTasks?: TaskUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUncheckedUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UploadedFileCreateWithoutStoredFileInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    uploader: UserCreateNestedOneWithoutUploadedFilesInput
  }

  export type UploadedFileUncheckedCreateWithoutStoredFileInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    uploaderId: string
  }

  export type UploadedFileCreateOrConnectWithoutStoredFileInput = {
    where: UploadedFileWhereUniqueInput
    create: XOR<UploadedFileCreateWithoutStoredFileInput, UploadedFileUncheckedCreateWithoutStoredFileInput>
  }

  export type UploadedFileCreateManyStoredFileInputEnvelope = {
    data: UploadedFileCreateManyStoredFileInput | UploadedFileCreateManyStoredFileInput[]
    skipDuplicates?: boolean
  }

  export type UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput = {
    where: UploadedFileWhereUniqueInput
    update: XOR<UploadedFileUpdateWithoutStoredFileInput, UploadedFileUncheckedUpdateWithoutStoredFileInput>
    create: XOR<UploadedFileCreateWithoutStoredFileInput, UploadedFileUncheckedCreateWithoutStoredFileInput>
  }

  export type UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput = {
    where: UploadedFileWhereUniqueInput
    data: XOR<UploadedFileUpdateWithoutStoredFileInput, UploadedFileUncheckedUpdateWithoutStoredFileInput>
  }

  export type UploadedFileUpdateManyWithWhereWithoutStoredFileInput = {
    where: UploadedFileScalarWhereInput
    data: XOR<UploadedFileUpdateManyMutationInput, UploadedFileUncheckedUpdateManyWithoutStoredFileInput>
  }

  export type UserCreateWithoutUploadedFilesInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutUploadedFilesInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskUncheckedCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutUploadedFilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
  }

  export type StoredFileCreateWithoutUploadsInput = {
    id?: string
    hash: string
    size: number
    createdAt?: Date | string
  }

  export type StoredFileUncheckedCreateWithoutUploadsInput = {
    id?: string
    hash: string
    size: number
    createdAt?: Date | string
  }

  export type StoredFileCreateOrConnectWithoutUploadsInput = {
    where: StoredFileWhereUniqueInput
    create: XOR<StoredFileCreateWithoutUploadsInput, StoredFileUncheckedCreateWithoutUploadsInput>
  }

  export type UserUpsertWithoutUploadedFilesInput = {
    update: XOR<UserUpdateWithoutUploadedFilesInput, UserUncheckedUpdateWithoutUploadedFilesInput>
    create: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedFilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedFilesInput, UserUncheckedUpdateWithoutUploadedFilesInput>
  }

  export type UserUpdateWithoutUploadedFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUncheckedUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type StoredFileUpsertWithoutUploadsInput = {
    update: XOR<StoredFileUpdateWithoutUploadsInput, StoredFileUncheckedUpdateWithoutUploadsInput>
    create: XOR<StoredFileCreateWithoutUploadsInput, StoredFileUncheckedCreateWithoutUploadsInput>
    where?: StoredFileWhereInput
  }

  export type StoredFileUpdateToOneWithWhereWithoutUploadsInput = {
    where?: StoredFileWhereInput
    data: XOR<StoredFileUpdateWithoutUploadsInput, StoredFileUncheckedUpdateWithoutUploadsInput>
  }

  export type StoredFileUpdateWithoutUploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoredFileUncheckedUpdateWithoutUploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskHistoryGroupCreateWithoutValuesInput = {
    id?: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
    task: TaskCreateNestedOneWithoutHistoryGroupsInput
    author: UserCreateNestedOneWithoutAuthoredTaskChangesInput
  }

  export type TaskHistoryGroupUncheckedCreateWithoutValuesInput = {
    id?: string
    taskId: string
    authorId: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
  }

  export type TaskHistoryGroupCreateOrConnectWithoutValuesInput = {
    where: TaskHistoryGroupWhereUniqueInput
    create: XOR<TaskHistoryGroupCreateWithoutValuesInput, TaskHistoryGroupUncheckedCreateWithoutValuesInput>
  }

  export type TaskHistoryGroupUpsertWithoutValuesInput = {
    update: XOR<TaskHistoryGroupUpdateWithoutValuesInput, TaskHistoryGroupUncheckedUpdateWithoutValuesInput>
    create: XOR<TaskHistoryGroupCreateWithoutValuesInput, TaskHistoryGroupUncheckedCreateWithoutValuesInput>
    where?: TaskHistoryGroupWhereInput
  }

  export type TaskHistoryGroupUpdateToOneWithWhereWithoutValuesInput = {
    where?: TaskHistoryGroupWhereInput
    data: XOR<TaskHistoryGroupUpdateWithoutValuesInput, TaskHistoryGroupUncheckedUpdateWithoutValuesInput>
  }

  export type TaskHistoryGroupUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
    task?: TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput
    author?: UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput
  }

  export type TaskHistoryGroupUncheckedUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
  }

  export type TaskCreateWithoutHistoryGroupsInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderKey: string
    author: UserCreateNestedOneWithoutAuthoredTasksInput
    responsible?: UserCreateNestedOneWithoutAssignedTasksInput
    parent?: TaskCreateNestedOneWithoutChildrenInput
    children?: TaskCreateNestedManyWithoutParentInput
  }

  export type TaskUncheckedCreateWithoutHistoryGroupsInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    responsibleId?: string | null
    parentId?: string | null
    orderKey: string
    children?: TaskUncheckedCreateNestedManyWithoutParentInput
  }

  export type TaskCreateOrConnectWithoutHistoryGroupsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutHistoryGroupsInput, TaskUncheckedCreateWithoutHistoryGroupsInput>
  }

  export type TaskHistoryValueCreateWithoutGroupInput = {
    taskId: string
    key: $Enums.TaskHistoryKey
    value: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueUncheckedCreateWithoutGroupInput = {
    taskId: string
    key: $Enums.TaskHistoryKey
    value: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueCreateOrConnectWithoutGroupInput = {
    where: TaskHistoryValueWhereUniqueInput
    create: XOR<TaskHistoryValueCreateWithoutGroupInput, TaskHistoryValueUncheckedCreateWithoutGroupInput>
  }

  export type TaskHistoryValueCreateManyGroupInputEnvelope = {
    data: TaskHistoryValueCreateManyGroupInput | TaskHistoryValueCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutAuthoredTaskChangesInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAuthoredTaskChangesInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutResponsibleInput
    authoredTasks?: TaskUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAuthoredTaskChangesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthoredTaskChangesInput, UserUncheckedCreateWithoutAuthoredTaskChangesInput>
  }

  export type TaskUpsertWithoutHistoryGroupsInput = {
    update: XOR<TaskUpdateWithoutHistoryGroupsInput, TaskUncheckedUpdateWithoutHistoryGroupsInput>
    create: XOR<TaskCreateWithoutHistoryGroupsInput, TaskUncheckedCreateWithoutHistoryGroupsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutHistoryGroupsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutHistoryGroupsInput, TaskUncheckedUpdateWithoutHistoryGroupsInput>
  }

  export type TaskUpdateWithoutHistoryGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderKey?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutAuthoredTasksNestedInput
    responsible?: UserUpdateOneWithoutAssignedTasksNestedInput
    parent?: TaskUpdateOneWithoutChildrenNestedInput
    children?: TaskUpdateManyWithoutParentNestedInput
  }

  export type TaskUncheckedUpdateWithoutHistoryGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
    children?: TaskUncheckedUpdateManyWithoutParentNestedInput
  }

  export type TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput = {
    where: TaskHistoryValueWhereUniqueInput
    update: XOR<TaskHistoryValueUpdateWithoutGroupInput, TaskHistoryValueUncheckedUpdateWithoutGroupInput>
    create: XOR<TaskHistoryValueCreateWithoutGroupInput, TaskHistoryValueUncheckedCreateWithoutGroupInput>
  }

  export type TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput = {
    where: TaskHistoryValueWhereUniqueInput
    data: XOR<TaskHistoryValueUpdateWithoutGroupInput, TaskHistoryValueUncheckedUpdateWithoutGroupInput>
  }

  export type TaskHistoryValueUpdateManyWithWhereWithoutGroupInput = {
    where: TaskHistoryValueScalarWhereInput
    data: XOR<TaskHistoryValueUpdateManyMutationInput, TaskHistoryValueUncheckedUpdateManyWithoutGroupInput>
  }

  export type TaskHistoryValueScalarWhereInput = {
    AND?: TaskHistoryValueScalarWhereInput | TaskHistoryValueScalarWhereInput[]
    OR?: TaskHistoryValueScalarWhereInput[]
    NOT?: TaskHistoryValueScalarWhereInput | TaskHistoryValueScalarWhereInput[]
    groupId?: UuidFilter<"TaskHistoryValue"> | string
    taskId?: UuidFilter<"TaskHistoryValue"> | string
    key?: EnumTaskHistoryKeyFilter<"TaskHistoryValue"> | $Enums.TaskHistoryKey
    value?: JsonFilter<"TaskHistoryValue">
  }

  export type UserUpsertWithoutAuthoredTaskChangesInput = {
    update: XOR<UserUpdateWithoutAuthoredTaskChangesInput, UserUncheckedUpdateWithoutAuthoredTaskChangesInput>
    create: XOR<UserCreateWithoutAuthoredTaskChangesInput, UserUncheckedCreateWithoutAuthoredTaskChangesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthoredTaskChangesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthoredTaskChangesInput, UserUncheckedUpdateWithoutAuthoredTaskChangesInput>
  }

  export type UserUpdateWithoutAuthoredTaskChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthoredTaskChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutResponsibleNestedInput
    authoredTasks?: TaskUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateWithoutAuthoredTasksInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutResponsibleInput
    authoredTaskChanges?: TaskHistoryGroupCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAuthoredTasksInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutResponsibleInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAuthoredTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthoredTasksInput, UserUncheckedCreateWithoutAuthoredTasksInput>
  }

  export type UserCreateWithoutAssignedTasksInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    authoredTasks?: TaskCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAssignedTasksInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    passwordHash: string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    authoredTasks?: TaskUncheckedCreateNestedManyWithoutAuthorInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAssignedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
  }

  export type TaskCreateWithoutChildrenInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderKey: string
    author: UserCreateNestedOneWithoutAuthoredTasksInput
    responsible?: UserCreateNestedOneWithoutAssignedTasksInput
    parent?: TaskCreateNestedOneWithoutChildrenInput
    historyGroups?: TaskHistoryGroupCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutChildrenInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    responsibleId?: string | null
    parentId?: string | null
    orderKey: string
    historyGroups?: TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutChildrenInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutChildrenInput, TaskUncheckedCreateWithoutChildrenInput>
  }

  export type TaskCreateWithoutParentInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderKey: string
    author: UserCreateNestedOneWithoutAuthoredTasksInput
    responsible?: UserCreateNestedOneWithoutAssignedTasksInput
    children?: TaskCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutParentInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    responsibleId?: string | null
    orderKey: string
    children?: TaskUncheckedCreateNestedManyWithoutParentInput
    historyGroups?: TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutParentInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput>
  }

  export type TaskCreateManyParentInputEnvelope = {
    data: TaskCreateManyParentInput | TaskCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type TaskHistoryGroupCreateWithoutTaskInput = {
    id?: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueCreateNestedManyWithoutGroupInput
    author: UserCreateNestedOneWithoutAuthoredTaskChangesInput
  }

  export type TaskHistoryGroupUncheckedCreateWithoutTaskInput = {
    id?: string
    authorId: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput
  }

  export type TaskHistoryGroupCreateOrConnectWithoutTaskInput = {
    where: TaskHistoryGroupWhereUniqueInput
    create: XOR<TaskHistoryGroupCreateWithoutTaskInput, TaskHistoryGroupUncheckedCreateWithoutTaskInput>
  }

  export type TaskHistoryGroupCreateManyTaskInputEnvelope = {
    data: TaskHistoryGroupCreateManyTaskInput | TaskHistoryGroupCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAuthoredTasksInput = {
    update: XOR<UserUpdateWithoutAuthoredTasksInput, UserUncheckedUpdateWithoutAuthoredTasksInput>
    create: XOR<UserCreateWithoutAuthoredTasksInput, UserUncheckedCreateWithoutAuthoredTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthoredTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthoredTasksInput, UserUncheckedUpdateWithoutAuthoredTasksInput>
  }

  export type UserUpdateWithoutAuthoredTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutResponsibleNestedInput
    authoredTaskChanges?: TaskHistoryGroupUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthoredTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutResponsibleNestedInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserUpsertWithoutAssignedTasksInput = {
    update: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type UserUpdateWithoutAssignedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    authoredTasks?: TaskUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    authoredTasks?: TaskUncheckedUpdateManyWithoutAuthorNestedInput
    authoredTaskChanges?: TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type TaskUpsertWithoutChildrenInput = {
    update: XOR<TaskUpdateWithoutChildrenInput, TaskUncheckedUpdateWithoutChildrenInput>
    create: XOR<TaskCreateWithoutChildrenInput, TaskUncheckedCreateWithoutChildrenInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutChildrenInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutChildrenInput, TaskUncheckedUpdateWithoutChildrenInput>
  }

  export type TaskUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderKey?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutAuthoredTasksNestedInput
    responsible?: UserUpdateOneWithoutAssignedTasksNestedInput
    parent?: TaskUpdateOneWithoutChildrenNestedInput
    historyGroups?: TaskHistoryGroupUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
    historyGroups?: TaskHistoryGroupUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutParentInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutParentInput, TaskUncheckedUpdateWithoutParentInput>
    create: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutParentInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutParentInput, TaskUncheckedUpdateWithoutParentInput>
  }

  export type TaskUpdateManyWithWhereWithoutParentInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutParentInput>
  }

  export type TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskHistoryGroupWhereUniqueInput
    update: XOR<TaskHistoryGroupUpdateWithoutTaskInput, TaskHistoryGroupUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskHistoryGroupCreateWithoutTaskInput, TaskHistoryGroupUncheckedCreateWithoutTaskInput>
  }

  export type TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskHistoryGroupWhereUniqueInput
    data: XOR<TaskHistoryGroupUpdateWithoutTaskInput, TaskHistoryGroupUncheckedUpdateWithoutTaskInput>
  }

  export type TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput = {
    where: TaskHistoryGroupScalarWhereInput
    data: XOR<TaskHistoryGroupUpdateManyMutationInput, TaskHistoryGroupUncheckedUpdateManyWithoutTaskInput>
  }

  export type UploadedFileCreateManyUploaderInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    storedFileId: string
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    expiresAt: Date | string
    hash: string
  }

  export type TaskCreateManyResponsibleInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    parentId?: string | null
    orderKey: string
  }

  export type TaskCreateManyAuthorInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    responsibleId?: string | null
    parentId?: string | null
    orderKey: string
  }

  export type TaskHistoryGroupCreateManyAuthorInput = {
    id?: string
    taskId: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
  }

  export type UploadedFileUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storedFile?: StoredFileUpdateOneRequiredWithoutUploadsNestedInput
  }

  export type UploadedFileUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storedFileId?: StringFieldUpdateOperationsInput | string
  }

  export type UploadedFileUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storedFileId?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutResponsibleInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderKey?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutAuthoredTasksNestedInput
    parent?: TaskUpdateOneWithoutChildrenNestedInput
    children?: TaskUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutResponsibleInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
    children?: TaskUncheckedUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutResponsibleInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderKey?: StringFieldUpdateOperationsInput | string
    responsible?: UserUpdateOneWithoutAssignedTasksNestedInput
    parent?: TaskUpdateOneWithoutChildrenNestedInput
    children?: TaskUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
    children?: TaskUncheckedUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
  }

  export type TaskHistoryGroupUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
    task?: TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput
    values?: TaskHistoryValueUpdateManyWithoutGroupNestedInput
  }

  export type TaskHistoryGroupUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type TaskHistoryGroupUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
  }

  export type UploadedFileCreateManyStoredFileInput = {
    id?: string
    originalName: string
    mimetype: string
    uploadedAt?: Date | string
    uploaderId: string
  }

  export type UploadedFileUpdateWithoutStoredFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: UserUpdateOneRequiredWithoutUploadedFilesNestedInput
  }

  export type UploadedFileUncheckedUpdateWithoutStoredFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaderId?: StringFieldUpdateOperationsInput | string
  }

  export type UploadedFileUncheckedUpdateManyWithoutStoredFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaderId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskHistoryValueCreateManyGroupInput = {
    taskId: string
    key: $Enums.TaskHistoryKey
    value: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueUpdateWithoutGroupInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    key?: EnumTaskHistoryKeyFieldUpdateOperationsInput | $Enums.TaskHistoryKey
    value?: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueUncheckedUpdateWithoutGroupInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    key?: EnumTaskHistoryKeyFieldUpdateOperationsInput | $Enums.TaskHistoryKey
    value?: JsonNullValueInput | InputJsonValue
  }

  export type TaskHistoryValueUncheckedUpdateManyWithoutGroupInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    key?: EnumTaskHistoryKeyFieldUpdateOperationsInput | $Enums.TaskHistoryKey
    value?: JsonNullValueInput | InputJsonValue
  }

  export type TaskCreateManyParentInput = {
    id?: string
    title: string
    state?: $Enums.TaskState
    archived?: boolean
    impact?: number
    ease?: number
    startAfter?: Date | string | null
    plannedStart?: Date | string | null
    dueTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    responsibleId?: string | null
    orderKey: string
  }

  export type TaskHistoryGroupCreateManyTaskInput = {
    id?: string
    authorId: string
    localCreatedAt: Date | string
    createdAt: Date | string
    createdAtFixReason?: $Enums.CreatedAtFixReason | null
  }

  export type TaskUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderKey?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutAuthoredTasksNestedInput
    responsible?: UserUpdateOneWithoutAssignedTasksNestedInput
    children?: TaskUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
    children?: TaskUncheckedUpdateManyWithoutParentNestedInput
    historyGroups?: TaskHistoryGroupUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    archived?: BoolFieldUpdateOperationsInput | boolean
    impact?: FloatFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    startAfter?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    plannedStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    orderKey?: StringFieldUpdateOperationsInput | string
  }

  export type TaskHistoryGroupUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueUpdateManyWithoutGroupNestedInput
    author?: UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput
  }

  export type TaskHistoryGroupUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
    values?: TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type TaskHistoryGroupUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    localCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput | $Enums.CreatedAtFixReason | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }
}