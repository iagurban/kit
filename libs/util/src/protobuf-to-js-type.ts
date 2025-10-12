import type { Long } from '@grpc/proto-loader';

export type ProtobufToJS<T> = T extends null | undefined
  ? T // Keep null and undefined as they are
  : T extends Long
    ? bigint // Convert Long to bigint
    : T extends { seconds: Long; nanos: number }
      ? Date // Convert Timestamp structure to Date
      : T extends (infer U)[]
        ? ProtobufToJS<U>[] // Handle arrays recursively
        : T extends object
          ? { [K in keyof T]: ProtobufToJS<T[K]> } // Handle objects recursively
          : T; // Keep all other types (string, number, boolean) as they are
