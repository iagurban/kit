import { constants } from 'node:os';

const validSignalNames = new Set(Object.keys(constants.signals));

/**
 * Type guard to check if a value is a valid NodeJS.Signals string.
 * @param value The value to check.
 * @returns True if the value is a valid signal name, false otherwise.
 */
export const isNodeJSSignal = (value: unknown): value is keyof typeof constants.signals | number =>
  typeof value === 'string'
    ? validSignalNames.has(value)
    : typeof value === 'number' && value >= 1 && value <= 64;
