import { ExMap } from '@gurban/kit/collections/ex-map';
import { checked } from '@gurban/kit/core/checks';
import { sortedIndex } from 'lodash';
import { z } from 'zod/v4';

export const permissionsSchema = z.object({
  clients: z.array(z.string()),
  permissions: z.record(z.string(), z.record(z.string(), z.union([z.array(z.string()), z.literal('*')]))),
});

export const parsePermissions = (data: unknown): Map<string, Record<string, readonly string[]>> => {
  const { permissions, clients } = permissionsSchema.parse(data);

  const all = new Set(clients);
  const allArray = [...all];

  const result = new ExMap<string /* client */, ExMap<string /* service */, string[] /* methods */>>();

  for (const [service, endpoints] of Object.entries(permissions)) {
    for (const [method, clients] of Object.entries(endpoints)) {
      for (const client of clients === `*` ? allArray : clients) {
        result
          .getOrCreate(
            checked(
              client,
              c => all.has(c),
              () => `Unknown client: ${client}, can't build permissions`
            ),
            () => new ExMap()
          )
          .update(service, (o = []) => {
            // a list of methods MUST be sorted
            o.splice(sortedIndex(o, method), 0, method);
            return o;
          });
      }
    }
  }

  return result.mapEntries(services =>
    Object.fromEntries(services.toArray((methods, service) => [service, methods] as const))
  );
};
