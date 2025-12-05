import http, { IncomingMessage } from 'node:http';
import https from 'node:https';
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

const awaitMessage = (res: IncomingMessage) =>
  new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    res.on('data', chunk => chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk)));
    res.on('end', () => resolve(Buffer.concat(chunks)));
    res.on('error', reject);
  });

/**
 * Custom error for failed {@link nodeFetch} requests.
 */
export class NodeFetchError extends Error {
  /**
   * @param url The URL that failed to fetch.
   * @param status The HTTP status code of the response.
   * @param res The underlying IncomingMessage object.
   */
  constructor(
    readonly url: string,
    readonly status: number | undefined,
    readonly res: IncomingMessage
  ) {
    super(`Failed to fetch ${url}: ${status}`);
  }

  /**
   * Consumes the response body of the failed request.
   * @returns A promise that resolves with the response body as a Buffer.
   */
  async body(): Promise<Buffer> {
    return awaitMessage(this.res);
  }
}

/**
 * Fetches a URL using the native http or https module and returns the response body as a Buffer.
 *
 * @param url The URL to fetch.
 * @returns A promise that resolves with the response body as a Buffer.
 * @throws {NodeFetchError} If the request fails or the status code is not 200.
 *
 * @example
 * ```ts
 * nodeFetch('https://example.com')
 *  .then(body => console.log(body.toString()))
 *  .catch(async e => {
 *    if (e instanceof NodeFetchError) {
 *      console.error(`Failed to fetch ${e.url}: ${e.status}`);
 *      console.error((await e.body()).toString());
 *    } else {
 *      throw e;
 *    }
 *  });
 * ```
 */
export const nodeFetch = (url: string) =>
  new Promise<Buffer>((resolve, reject) => {
    const httpModule = url.startsWith('https:') ? https : http;
    httpModule
      .get(url, res => {
        if (res.statusCode === 200) {
          awaitMessage(res).then(resolve, reject);
        } else {
          reject(new NodeFetchError(url, res.statusCode, res));
        }
      })
      .on('error', reject);
  });
