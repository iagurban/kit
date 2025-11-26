import { constants } from 'node:os';

import { isNodeJSSignal } from './node-util';

describe('isNodeJSSignal', () => {
  it('should return true for valid signal names', () => {
    expect(isNodeJSSignal('SIGHUP')).toBe(true);
    expect(isNodeJSSignal('SIGINT')).toBe(true);
    expect(isNodeJSSignal('SIGTERM')).toBe(true);
  });

  it('should return false for invalid signal names', () => {
    expect(isNodeJSSignal('INVALID_SIGNAL')).toBe(false);
    expect(isNodeJSSignal('')).toBe(false);
  });

  it('should return true for valid signal numbers', () => {
    expect(isNodeJSSignal(1)).toBe(true); // SIGHUP
    expect(isNodeJSSignal(2)).toBe(true); // SIGINT
    expect(isNodeJSSignal(15)).toBe(true); // SIGTERM
    expect(isNodeJSSignal(64)).toBe(true);
  });

  it('should return false for invalid signal numbers', () => {
    expect(isNodeJSSignal(0)).toBe(false);
    expect(isNodeJSSignal(65)).toBe(false);
    expect(isNodeJSSignal(-1)).toBe(false);
  });

  it('should return false for other types', () => {
    expect(isNodeJSSignal(null)).toBe(false);
    expect(isNodeJSSignal(undefined)).toBe(false);
    expect(isNodeJSSignal({})).toBe(false);
    expect(isNodeJSSignal([])).toBe(false);
    expect(isNodeJSSignal(true)).toBe(false);
  });

  it('should handle all signals from os.constants.signals', () => {
    for (const signal in constants.signals) {
      expect(isNodeJSSignal(signal)).toBe(true);
    }
  });
});
