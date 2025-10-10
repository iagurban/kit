import Long from 'long';

export const protobufLongToBigint = (long: Long) => long.toBigInt();

export const protobufLongFromBigint = (value: bigint) => Long.fromBigInt(value);
