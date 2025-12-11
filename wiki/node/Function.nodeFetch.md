# Function: nodeFetch()

```ts
function nodeFetch(url): Promise<Buffer<ArrayBufferLike>>;
```

Defined in: [IdeaProjects/kit/kit/src/node/node-util.ts:72](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/node/node-util.ts#L72)

Fetches a URL using the native http or https module and returns the response body as a Buffer.

## Parameters

### url

`string`

The URL to fetch.

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

A promise that resolves with the response body as a Buffer.

## Throws

If the request fails or the status code is not 200.

## Example

```ts
nodeFetch('https://example.com')
 .then(body => console.log(body.toString()))
 .catch(async e => {
   if (e instanceof NodeFetchError) {
     console.error(`Failed to fetch ${e.url}: ${e.status}`);
     console.error((await e.body()).toString());
   } else {
     throw e;
   }
 });
```
