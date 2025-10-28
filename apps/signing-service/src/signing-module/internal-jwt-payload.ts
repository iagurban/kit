export type InternalJWTPayload = {
  sub: string;
  aud: string;
  permissions: Record<string /* service */, readonly string[] /* methods (sorted!) */>;
};
