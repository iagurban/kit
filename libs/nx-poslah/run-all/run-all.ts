import { ExecutorContext, ProjectGraph, ProjectGraphProjectNode, readCachedProjectGraph } from '@nx/devkit';
import { spawn, SpawnOptions } from 'child_process';

import { optionsSource } from '../src/options-source';
import { RunAllExecutorSchema } from './schema';

function getProjects(
  projectGraph: ProjectGraph,
  tags: string[] | undefined,
  include: string[] | undefined,
  exclude: string[] | undefined
): ProjectGraphProjectNode[] {
  const allProjects = Object.values(projectGraph.nodes);

  if (include) {
    return allProjects.filter(p => include.includes(p.name));
  }

  let filteredProjects = allProjects;

  if (tags && tags.length > 0) {
    filteredProjects = filteredProjects.filter(p => p.data.tags?.some(tag => tags.includes(tag)));
  }

  if (exclude) {
    filteredProjects = filteredProjects.filter(p => !exclude.includes(p.name));
  }

  return filteredProjects;
}

const getLabel = (projectName: string, labelRegex: string | undefined) => {
  if (labelRegex) {
    const match = projectName.match(new RegExp(labelRegex));
    if (match && match[1]) {
      return match[1];
    }
  }
  return projectName;
};

async function runConcurrentlyExecutor(
  options: RunAllExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const getOption = optionsSource({ ...options });

  const target = getOption.getOrThrow('target');

  const projectGraph = readCachedProjectGraph();
  const projects = getProjects(
    projectGraph,
    options.tags?.map((_, i) => getOption.getOrThrow(`tags.${i}`)),
    options.include?.map((_, i) => getOption.getOrThrow(`include.${i}`)),
    options.exclude?.map((_, i) => getOption.getOrThrow(`exclude.${i}`))
  );

  const commands: string[] = [];
  const names: string[] = [];
  const skippedProjects: string[] = [];

  const configuration = getOption.get('configuration', () => undefined);
  const args = getOption.get('args', () => undefined);
  const labelRegex = getOption.get('labelRegex', () => undefined);

  for (const project of projects) {
    if (project.data.targets?.[target]) {
      commands.push(
        [`yarn nx run ${project.name}:${target}`, configuration && `:${configuration}`, args && ` ${args}`]
          .filter(Boolean)
          .join('')
      );

      names.push(getLabel(project.name, labelRegex));
    } else {
      skippedProjects.push(project.name);
    }
  }

  if (skippedProjects.length > 0) {
    console.log(
      `[Poslah RunAll] Skipping projects without "${target}" target: ${skippedProjects.join(', ')}`
    );
  }

  if (commands.length === 0) {
    console.log(`[Poslah RunAll] No projects found with target "${target}"`);
    return { success: true };
  }

  const concurrentlyArgs = ['concurrently'];
  if (options.colorize ?? true) {
    concurrentlyArgs.push('--prefix-colors', 'auto');
  }
  concurrentlyArgs.push('--names', names.join(','));
  concurrentlyArgs.push(...commands.map(c => `"${c.replace(/"/g, '\\"')}"`));

  console.log(`[Poslah RunAll] Running command: yarn ${concurrentlyArgs.join(' ')}`);

  const envOption = options.env;
  const env = envOption
    ? Object.fromEntries(Object.keys(envOption).map(key => [key, getOption.getOrThrow(`env.${key}`)]))
    : {};

  return new Promise(resolve => {
    const spawnOptions: SpawnOptions = {
      stdio: 'inherit',
      shell: true,
      cwd: context.root,
      env: {
        ...process.env,
        ...env,
      },
      detached: true,
    };

    const child = spawn('yarn', concurrentlyArgs, spawnOptions);

    const handleTermination = (signal: NodeJS.Signals) => {
      console.log(`[Poslah RunAll] Process terminated by signal: ${signal}`);
      if (child.pid) {
        // Kill the entire process group
        if (process.platform === 'win32') {
          spawn('taskkill', ['/pid', child.pid.toString(), '/t', '/f']);
        } else {
          process.kill(-child.pid, signal);
        }
      }
    };

    const sigintListener = () => handleTermination('SIGINT');
    const sigtermListener = () => handleTermination('SIGTERM');

    process.on('SIGINT', sigintListener);
    process.on('SIGTERM', sigtermListener);

    const cleanupListeners = () => {
      process.removeListener('SIGINT', sigintListener);
      process.removeListener('SIGTERM', sigtermListener);
    };

    child.on('close', (code, signal) => {
      cleanupListeners();
      if (signal) {
        console.log(`[Poslah RunAll] Process terminated by signal: ${signal}`);
        resolve({ success: true });
      } else if (code === 0) {
        resolve({ success: true });
      } else {
        console.error(`[Poslah RunAll] Exited with code ${code}`);
        resolve({ success: false });
      }
    });

    child.on('error', err => {
      cleanupListeners();
      console.error('[Poslah RunAll] Failed to start subprocess.', err);
      resolve({ success: false });
    });
  });
}

const runNxRunManyExecutor = (
  options: RunAllExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> => {
  const { getOrThrow, get } = optionsSource({ ...options });

  const target = getOrThrow('target');

  const projectGraph = readCachedProjectGraph();
  const projects = getProjects(
    projectGraph,
    options.tags?.map((_, i) => getOrThrow(`tags.${i}`)),
    options.include?.map((_, i) => getOrThrow(`include.${i}`)),
    options.exclude?.map((_, i) => getOrThrow(`exclude.${i}`))
  );

  const projectNames = projects.map(p => p.name);

  if (projectNames.length === 0) {
    console.log(`[Poslah RunAll] No projects found with target "${target}"`);
    return Promise.resolve({ success: true });
  }

  const configuration = get('configuration', () => undefined);
  const args = get('args', () => undefined);

  const runManyArgs = ['nx', 'run-many', `--target=${target}`, `--projects=${projectNames.join(',')}`];

  if (configuration) {
    runManyArgs.push(`--configuration=${configuration}`);
  }

  if (args) {
    runManyArgs.push(args);
  }

  console.log(`[Poslah RunAll] Running command: yarn ${runManyArgs.join(' ')}`);

  const envOption = options.env;
  const env = envOption
    ? Object.fromEntries(Object.keys(envOption).map(key => [key, getOrThrow(`env.${key}`)]))
    : {};

  return new Promise(resolve => {
    const spawnOptions: SpawnOptions = {
      stdio: 'inherit',
      // shell: true,
      cwd: context.root,
      env: {
        ...process.env,
        ...env,
      },
      detached: true,
    };

    const child = spawn('yarn', runManyArgs, spawnOptions);

    const handleTermination = (signal: NodeJS.Signals) => {
      console.log(`[Poslah RunAll] Process terminated by signal: ${signal}`);
      if (child.pid) {
        // Kill the entire process group
        if (process.platform === 'win32') {
          spawn('taskkill', ['/pid', child.pid.toString(), '/t', '/f']);
        } else {
          process.kill(-child.pid, signal);
        }
      }
    };

    const sigintListener = () => handleTermination('SIGINT');
    const sigtermListener = () => handleTermination('SIGTERM');

    process.on('SIGINT', sigintListener);
    process.on('SIGTERM', sigtermListener);

    const cleanupListeners = () => {
      process.removeListener('SIGINT', sigintListener);
      process.removeListener('SIGTERM', sigtermListener);
    };

    child.on('close', (code, signal) => {
      cleanupListeners();
      if (signal) {
        console.log(`[Poslah RunAll] Process terminated by signal: ${signal}`);
        resolve({ success: true });
      } else if (code === 0) {
        resolve({ success: true });
      } else {
        console.error(`[Poslah RunAll] Exited with code ${code}`);
        resolve({ success: false });
      }
    });

    child.on('error', err => {
      cleanupListeners();
      console.error('[Poslah RunAll] Failed to start subprocess.', err);
      resolve({ success: false });
    });
  });
};

export default async function runExecutor(
  options: RunAllExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  return options.ci ? runNxRunManyExecutor(options, context) : runConcurrentlyExecutor(options, context);
}
