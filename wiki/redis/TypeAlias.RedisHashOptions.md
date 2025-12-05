# Type Alias: RedisHashOptions

```ts
type RedisHashOptions = object;
```

Defined in: [redis-helpers.ts:8](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/redis/redis-helpers.ts#L8)

Options for Redis Hash conversion.

## Properties

### fallback()? {#fallback}

```ts
optional fallback: (stringValue, field, error) => JsonValue;
```

Defined in: [redis-helpers.ts:13](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/redis/redis-helpers.ts#L13)

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
