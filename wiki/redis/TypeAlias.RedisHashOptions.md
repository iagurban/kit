# Type Alias: RedisHashOptions

```ts
type RedisHashOptions = object;
```

Defined in: [redis-helpers.ts:8](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/redis-helpers.ts#L8)

Options for Redis Hash conversion.

## Properties

### fallback()? {#fallback}

```ts
optional fallback: (stringValue, field, error) => JsonValue;
```

Defined in: [redis-helpers.ts:13](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/redis-helpers.ts#L13)

Optional function to handle string values that fail JSON.parse.
Accepts the problematic string value and must return a JsonValue.

#### Parameters

##### stringValue

`string`

##### field

`string`

##### error

`unknown`

#### Returns

`JsonValue`
