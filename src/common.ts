import fs from 'node:fs/promises';
import { glob } from 'glob';
import yaml from 'js-yaml';

import type { Configuration } from './configuration';

export async function loadConfiguration() {
  const data = await fs.readFile('.lisan-al-gaib.yml', 'utf8');
  const configuration = yaml.load(data) as Configuration;
  return configuration;
}

export async function filesToProcess(configuration: Configuration) {
  const includePatterns = configuration.includePatterns;
  const excludePatterns = configuration.excludePatterns;

  const files = await glob(includePatterns, {
    cwd: process.cwd(),
    nodir: true,
    ignore: excludePatterns,
  });

  return files;
}
