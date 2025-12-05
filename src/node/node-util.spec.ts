import { EventEmitter } from 'node:events';
import http, { IncomingMessage } from 'node:http';
import https from 'node:https';
import { constants } from 'node:os';

import { AnyAnyFunction } from '../core/types';
import { isNodeJSSignal, nodeFetch, NodeFetchError } from './node-util';

type Any = ReturnType<AnyAnyFunction>;

jest.mock('node:http');
jest.mock('node:https');

describe('node-util', () => {
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

  describe('nodeFetch', () => {
    const mockedHttp = http.get as jest.Mock;
    const mockedHttps = https.get as jest.Mock;

    afterEach(() => {
      mockedHttp.mockClear();
      mockedHttps.mockClear();
    });

    it('should resolve with data on successful http request', async () => {
      const mockResponse = new EventEmitter() as IncomingMessage;
      mockResponse.statusCode = 200;
      const mockRequest = new EventEmitter();
      const responseData = Buffer.from('test data');

      mockedHttp.mockImplementation((_url, callback) => {
        callback(mockResponse);
        return mockRequest as Any;
      });

      const promise = nodeFetch('http://test.com');

      mockResponse.emit('data', responseData);
      mockResponse.emit('end');

      await expect(promise).resolves.toEqual(responseData);
    });

    it('should resolve with data on successful https request', async () => {
      const mockResponse = new EventEmitter() as IncomingMessage;
      mockResponse.statusCode = 200;
      const mockRequest = new EventEmitter();
      const responseData = Buffer.from('test data');

      mockedHttps.mockImplementation((_url, callback) => {
        callback(mockResponse);
        return mockRequest as Any;
      });

      const promise = nodeFetch('https://test.com');

      mockResponse.emit('data', responseData);
      mockResponse.emit('end');

      await expect(promise).resolves.toEqual(responseData);
    });

    it('should reject with error on request error', async () => {
      const mockRequest = new EventEmitter();
      const error = new Error('test error');

      mockedHttp.mockImplementation(() => mockRequest as Any);

      const promise = nodeFetch('http://test.com');

      mockRequest.emit('error', error);

      await expect(promise).rejects.toThrow(error);
    });

    it('should correctly concatenate mixed buffer and string chunks', async () => {
      const mockResponse = new EventEmitter() as IncomingMessage;
      mockResponse.statusCode = 200;
      const mockRequest = new EventEmitter();

      const chunk1 = Buffer.from('first-');
      const chunk2 = 'second-';
      const chunk3 = Buffer.from('third');
      const expectedData = Buffer.from('first-second-third');

      mockedHttp.mockImplementation((_url, callback) => {
        callback(mockResponse);
        return mockRequest as Any;
      });

      const promise = nodeFetch('http://test.com');

      mockResponse.emit('data', chunk1);
      mockResponse.emit('data', chunk2);
      mockResponse.emit('data', chunk3);
      mockResponse.emit('end');

      await expect(promise).resolves.toEqual(expectedData);
    });

    it('should reject with NodeFetchError on non-200 status code and allow body() to read response', async () => {
      const testUrl = 'http://error.com';
      const testStatusCode = 404;
      const errorBody = Buffer.from('Not Found');

      const mockResponse = new EventEmitter() as IncomingMessage;
      mockResponse.statusCode = testStatusCode;
      const mockRequest = new EventEmitter();

      mockedHttp.mockImplementation((url, callback) => {
        expect(url).toBe(testUrl);
        callback(mockResponse);
        return mockRequest as Any;
      });

      const promise = nodeFetch(testUrl);

      // Await the rejection to get the error instance
      const error = await promise.catch(e => e);

      expect(error).toBeInstanceOf(NodeFetchError);
      const nodeFetchError = error as NodeFetchError;

      expect(nodeFetchError.url).toBe(testUrl);
      expect(nodeFetchError.status).toBe(testStatusCode);
      expect(nodeFetchError.res).toBe(mockResponse);

      // Now, call body() to attach its listeners
      const bodyPromise = nodeFetchError.body();

      // And *then* emit the events on the mockResponse for body() to resolve
      mockResponse.emit('data', errorBody);
      mockResponse.emit('end');

      await expect(bodyPromise).resolves.toEqual(errorBody);
    });

    it('NodeFetchError.body() should return the response body correctly after rejection', async () => {
      const testUrl = 'http://error.com/body';
      const testStatusCode = 500;
      const responseContent = Buffer.from('Internal Server Error Details');

      const mockResponse = new EventEmitter() as IncomingMessage;
      mockResponse.statusCode = testStatusCode;
      const mockRequest = new EventEmitter();

      mockedHttp.mockImplementation((url, callback) => {
        expect(url).toBe(testUrl);
        callback(mockResponse);
        return mockRequest as Any;
      });

      const promise = nodeFetch(testUrl);

      const error = await promise.catch(e => e);

      expect(error).toBeInstanceOf(NodeFetchError);
      const nodeFetchError = error as NodeFetchError;

      // Now, call body() to attach its listeners
      const bodyPromise = nodeFetchError.body();

      // And *then* emit the events on the mockResponse for body() to resolve
      mockResponse.emit('data', responseContent);
      mockResponse.emit('end');

      await expect(bodyPromise).resolves.toEqual(responseContent);
    });
  });
});
