export const protobufTimestampFromDate = (d: Date) => {
  const millis = d.getTime();
  return {
    /// TODO ask, if currently Date object doesn't support bigints for time? may be return this structure to client instead of Date?
    seconds: BigInt(Math.floor(millis / 1000)),
    nanos: (millis % 1000) * 1_000_000,
  } as const;
};

export const protobufTimestampToDate = (stamp: { seconds: bigint; nanos: number }) =>
  new Date(/* TODO ??? Number losing data) */ Number(stamp.seconds * 1000n) + Math.round(stamp.nanos / 1e6));
