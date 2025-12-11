# kit

TypeScript utility kit for full‑stack projects – collections, functional helpers, React and MobX utilities, NestJS building blocks, Prisma, Redis helpers, and Zod utilities.

[![Tests](https://github.com/iagurban/kit/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/iagurban/kit/actions/workflows/test.yml)

### Core highlights

- Strongly typed collections and iterations (`ExMap`, `ExSet`, etc.)
- Manual Unicode key sorting and pagination helpers (custom UI ordering, keyset pagination)
- Pragmatic math/geometry, aggregation, and native collection helpers
- Functional flow utilities: tiny composables, lazy getters, safe guards/validators, error helpers
- Frontend helpers for React and MobX; backend helpers for NestJS/GraphQL/Redis/Prisma
- No runtime dependencies; code linted and tested
- Extracted from real projects and recurring experiments

### Modules

- [@grbn/kit](./wiki/core/Home.md) — foundational utilities: typed collections, functional helpers, async control, numbers/geometry, JSON, logging, and error helpers.
- [@grbn/kit/react](./wiki/react/Home.md) — React ergonomics: safe context creation, simple DOM/element tree utilities.
- [@grbn/kit/react/mobx](./wiki/react-mobx/Home.md) — animated SVG gradient presets, keyframes builder, DnD tree fabric, resize observer hook, and small animation utilities for MobX + React.
- [@grbn/kit/mobx](./wiki/mobx/Home.md) — observable collections, snapshot tooling, and ergonomics like `observerWithForwardRef` and root store registration.
- [@grbn/kit/nest](./wiki/nest/Home.md) — NestJS building blocks: JWT/OIDC auth bases, interceptors (server timestamp/contextual user), guards/decorators, and service helpers.
- [@grbn/kit/node](./wiki/node/Home.md) — Node helpers.
- [@grbn/kit/prisma](./wiki/prisma/Home.md) — keyset pagination (builder + runtime) and helpers to parse Prisma schema model metadata.
- [@grbn/kit/redis](./wiki/redis/Home.md) — Redis cached resource + pub/sub subscription and JSON↔hash helpers for structured storage.
- [@grbn/kit/graphql](./wiki/graphql/Home.md) — `cacheKeyFromGraphqlPath` to build deterministic cache keys from `GraphQLResolveInfo.path`.
- [@grbn/kit/zod](./wiki/zod/Home.md) — Zod helpers: typed `declareEventsTopic`, input/output type guards, and common schemas.

### Usage notes

- Target: TypeScript projects (frontend and backend) that prefer zero runtime deps and strong typing.
- Modules are split by domain (core, react, mobx, nest, prisma, redis, graphql, zod) — import only what you need.
- Many utilities are small, composable functions — favor composition over inheritance; see docs for focused examples.

### Scripts

- Build: `yarn build`
- Lint: `yarn lint`
- Test: `yarn test` (see coverage in `coverage/`)
- Docs (Markdown to wiki): `yarn docs:md`

### License

This project is licensed under the terms of the MIT License. See the [LICENSE](./LICENSE) file for details.
