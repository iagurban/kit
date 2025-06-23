import { rndStr } from '@gurban/kit';

import { PrismaClient } from '../src/generated/db-client';
import { manualSort } from '../src/manual-sort';
import { hashing } from '../src/modules/auth/auth.service';

console.log(`[started]`);

const enchanceWithOrder = <T>(o: readonly T[]): (T & { orderKey: string })[] => {
  const keys = manualSort.getNewKeys(o.length);
  return o.map((v, i) => ({ ...v, orderKey: keys[i] }) as const);
};

(async () => {
  const db = new PrismaClient();

  const me = await db.user.upsert({
    where: { email: `admin@google.com` },
    create: { name: `admin`, email: `admin@google.com`, passwordHash: await hashing.hash(`pass`) },
    update: {},
  });

  // await db.menu.deleteMany({ where: { ownerId: me.id } });

  const menu = await db.menu.create({
    data: {
      title: `Menu ${rndStr()}`,
      ownerId: me.id,
    },
    include: { items: true },
  });

  const [pizza, burgers] = await db.item.createManyAndReturn({
    data: enchanceWithOrder([{ title: `Pizza` }, { title: `Burgers` }].map(o => ({ ...o, menuId: menu.id }))),
  });

  await db.item.createMany({
    data: enchanceWithOrder(
      [{ title: `Pizza 1` }, { title: `Pizza 2` }].map(o => ({ ...o, parentId: pizza.id, menuId: menu.id }))
    ),
  });

  await db.item.createMany({
    data: enchanceWithOrder(
      [
        { title: `Burger 1` },
        { title: `Burger 2` },
        { title: `Burger 3` },
        { title: `Burger 4` },
        { title: `Burger 5` },
      ].map(o => ({ ...o, parentId: burgers.id, menuId: menu.id }))
    ),
  });
})()
  .finally(async () => {
    console.log(`[finished]`);
  })
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(255);
  });
