import { Prisma } from '../generated/db-client/client';

type PrismaClientErrorWithMeta<T> = Prisma.PrismaClientKnownRequestError & { meta: T };

export const isPrismaClientError = Object.assign(
  (error: unknown): error is Prisma.PrismaClientKnownRequestError =>
    error instanceof Prisma.PrismaClientKnownRequestError,
  {
    uniqueConstraintFailed: (
      error: Prisma.PrismaClientKnownRequestError
    ): error is PrismaClientErrorWithMeta<{
      target: readonly string[];
    }> => error.code === 'P2002',

    foreignRecordNotFound: (
      error: Prisma.PrismaClientKnownRequestError
    ): error is PrismaClientErrorWithMeta<{
      field_name: string;
    }> => error.code === 'P2003',

    databaseConstraintFailed: (
      error: Prisma.PrismaClientKnownRequestError
    ): error is PrismaClientErrorWithMeta<{
      database_error: string;
    }> => error.code === 'P2004',

    requiredRecordsNotFound: (
      error: Prisma.PrismaClientKnownRequestError
    ): error is PrismaClientErrorWithMeta<{
      cause: string;
    }> => error.code === 'P2025',
  }
);
