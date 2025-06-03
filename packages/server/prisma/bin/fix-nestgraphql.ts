import * as fs from 'node:fs';

(async () => {
  for await (const path of fs.promises.glob(`./src/generated/nestgraphql/**/*`)) {
    // console.log(path);
    let content: string;
    try {
      content = await fs.promises.readFile(path, { encoding: `utf-8` });
    } catch (e) {
      console.log(path, e);
      continue;
    }
    let newContent = content;
    for (const m of Array.from( content.matchAll(/\bimport\s*\{\s*Decimal\s*}\s*from\s*['"]([^'"]+)\/runtime\/(?:library|binary)['"];\n/g) || []).reverse()) {
      const {index} = m;
      const [matched, client] = m;
      const rep = `import {Prisma} from '${client}';\nimport Decimal = Prisma.Decimal;\n`;
      // console.log(path, index, rep);
      newContent = newContent.slice(0, index) + rep + newContent.slice(index + matched.length);
      console.log(path, `Fix Decimal`);
    }
    if (newContent !== content) {
      await fs.promises.writeFile(path, newContent, { encoding: `utf-8` })
    }
  }

  {
    const clientTs = (await fs.promises.readFile(`./src/generated/db-client/client.ts`)).toString(`utf-8`)
      .replace(/export\s+const\s+NullTypes\s*=/, `export const NullTypes: {
    readonly DbNull: typeof runtime.objectEnumValues.classes.DbNull
    readonly JsonNull: typeof runtime.objectEnumValues.classes.JsonNull
    readonly AnyNull: typeof runtime.objectEnumValues.classes.AnyNull
  } =`)
      .replace(/export\s+const\s+DbNull\s*=/, `export const DbNull: { toString(): string } =`)
      .replace(/export\s+const\s+JsonNull\s*=/, `export const JsonNull: { toString(): string } =`)
      .replace(/export\s+const\s+AnyNull\s*=/, `export const AnyNull: { toString(): string } =`);
    await fs.promises.writeFile(`./src/generated/db-client/client.ts`, clientTs);
    console.log(`[fix client.ts]`);
  }

})().then(() => {
  console.log(`[finish]`);
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(-1);
})
