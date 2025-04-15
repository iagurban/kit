import { hashing } from '../src/auth/auth.service';
import { PrismaClient } from '../src/db-client.generated';

(async () => {
  const db = new PrismaClient();
  await db.user.create({
    data: { name: `admin`, email: `admin@google.com`, passwordHash: await hashing.hash(`pass`) },
  });
})();
