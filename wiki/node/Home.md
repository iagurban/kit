# @grbn/kit

## Functions

- [isNodeJSSignal](Function.isNodeJSSignal.md)
- [nodeFetch](Function.nodeFetch.md)


# Function: isNodeJSSignal()

```ts
function isNodeJSSignal(value): value is number | Signals;
```

Defined in: [IdeaProjects/kit/kit/src/node/node-util.ts:12](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/node/node-util.ts#L12)

Type guard to check if a value is a valid NodeJS.Signals string.

## Parameters

### value `unknown`

The value to check.

## Returns

value is number \| Signals

True if the value is a valid signal name, false otherwise.


# Function: nodeFetch()

```ts
function nodeFetch(url): Promise<Buffer<ArrayBufferLike>>;
```

Defined in: [IdeaProjects/kit/kit/src/node/node-util.ts:72](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/node/node-util.ts#L72)

Fetches a URL using the native http or https module and returns the response body as a Buffer.

## Parameters

### url `string`

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
