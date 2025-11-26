# Type Alias: RedisHashOptions

```ts
type RedisHashOptions = object;
```

Defined in: [redis-helpers.ts:8](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-helpers.ts#L8)

Options for Redis Hash conversion.

## Properties

### fallback()? {#fallback}

```ts
optional fallback: (stringValue, field, error) => JsonValue;
```

Defined in: [redis-helpers.ts:13](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-helpers.ts#L13)

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
