import fs, { readFile } from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import yaml from 'js-yaml';

import type { Configuration } from './configuration';

import { configurationSchema } from './configuration';

export async function loadConfiguration(): Promise<Configuration> {
  const data = await fs.readFile('.lisan-al-gaib.yml', 'utf8');
  const configuration = yaml.load(data) as Configuration;
  return configurationSchema.parse(configuration);
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

export async function readContent(configuration: Configuration) {
  const files = await filesToProcess(configuration);

  if (files.length === 0) {
    throw new Error('No files found');
  }

  const filesContent = await Promise.all(
    files.map((file) => {
      const fullPath = path.join(process.cwd(), file);
      return readFile(fullPath, 'utf8');
    })
  );

  const zipedFilenameAndContent = filesContent.map((content, index) => {
    const fileName = files[index];
    return { fileName, content };
  });

  const finalContent = zipedFilenameAndContent
    .map((f) => {
      return `File: ${f.fileName}\n\n${f.content}`;
    })
    .join('\n');

  return finalContent;
}
