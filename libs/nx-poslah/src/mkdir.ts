import {resolve} from "path";
import {mkdir} from "fs/promises";

export const mkDirP = async (root: string, cwd: string | undefined) => {
  if (cwd) {
    const absoluteCwd = resolve(root, cwd);
    await mkdir(absoluteCwd, {recursive: true});
    return absoluteCwd;
  } else {
    return root;
  }
};
