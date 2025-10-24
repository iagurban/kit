// import { manualSort } from '../src/shared';
import { hashing } from '@gurban/kit/nest/auth-service-base';
import { Injectable, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DbModule } from '@poslah/util/db/db.module';
import { DbService } from '@poslah/util/db/db.service';

console.log(`[started]`);

// const enchanceWithOrder = <T>(o: readonly T[]): (T & { orderKey: string })[] => {
//   const keys = manualSort.getNewKeys(o.length);
//   return o.map((v, i) => ({ ...v, orderKey: keys[i] }) as const);
// };

@Injectable()
export class AppService {
  constructor(readonly db: DbService) {}

  async createUsers() {
    const entries = await Promise.all(
      (
        [
          { name: `admin`, email: `admin@google.com`, abbrev: `[A]` },
          { name: `John Locke`, email: `john.locke@google.com`, abbrev: `JL` },
          { name: `Jack Shephard`, email: `jack.shephard@google.com`, abbrev: `JS` },
          { name: `Kate Austen`, email: `kate.austen@google.com`, abbrev: `KA` },
          { name: `James "Sawyer" Ford`, email: `james.ford@google.com`, abbrev: `JF` },
          { name: `Sayid Jarrah`, email: `sayid.jarrah@google.com`, abbrev: `SJ` },
          { name: `Hurley Reyes`, email: `hurley.reyes@google.com`, abbrev: `HR` },
          { name: `Charlie Pace`, email: `charlie.pace@google.com`, abbrev: `CP` },
          { name: `Claire Littleton`, email: `claire.littleton@google.com`, abbrev: `CL` },
          { name: `Jin-Soo Kwon`, email: `jin.kwon@google.com`, abbrev: `JK` },
          { name: `Sun-Hwa Kwon`, email: `sun.kwon@google.com`, abbrev: `SK` },
          { name: `Michael Dawson`, email: `michael.dawson@google.com`, abbrev: `MD` },
          { name: `Walt Lloyd`, email: `walt.lloyd@google.com`, abbrev: `WL` },
          { name: `Boone Carlyle`, email: `boone.carlyle@google.com`, abbrev: `BC` },
          { name: `Shannon Rutherford`, email: `shannon.rutherford@google.com`, abbrev: `SR` },
          { name: `Desmond Hume`, email: `desmond.hume@google.com`, abbrev: `DH` },
          { name: `Juliet Burke`, email: `juliet.burke@google.com`, abbrev: `JB` },
          { name: `Benjamin Linus`, email: `benjamin.linus@google.com`, abbrev: `BL` },
          { name: `Richard Alpert`, email: `richard.alpert@google.com`, abbrev: `RA` },
        ] as const
      ).map(async u => ({ ...u, passwordHash: await hashing.hash(`pass`) }))
    );

    return Promise.all(
      entries.map(async data => {
        return (
          (await this.db.transaction.user.findFirst({
            where: { email: data.email },
            select: {
              // ownProjectId: true,
              name: true,
              id: true,
              email: true,
              abbrev: true,
            },
          })) ||
          (await this.db.transaction.user.create({
            data,
            select: {
              // ownProjectId: true,
              name: true,
              id: true,
              email: true,
              abbrev: true,
            },
          }))
        );
      })
    );
  }

  async seed() {
    const [me] = await this.createUsers();
  }
}

@Module({
  imports: [DbModule],
  providers: [AppService],
})
export class AppModule {}

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.get(AppService).seed();
})()
  .finally(async () => {
    console.log(`[finished]`);
  })
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(255);
  });
