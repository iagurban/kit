export const errorToString = (error: unknown) => (error instanceof Error ? error.message : String(error));

export const errorFromUnknown = (e: unknown) => (e instanceof Error ? e : new Error(String(e)));
