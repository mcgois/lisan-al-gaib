import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import ora from 'ora';
import { ZodError } from 'zod';

import { filesToProcess, loadConfiguration } from './common';

export async function exportContent(outputFile: string) {
  const spinner = ora('Exporting content').start();

  try {
    const configuration = await loadConfiguration();
    const files = await filesToProcess(configuration);

    if (files.length === 0) {
      spinner.warn('No files found');
      spinner.stop();
      return;
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

    const finalResult = zipedFilenameAndContent
      .map((f) => {
        return `File: ${f.fileName}\n\n${f.content}`;
      })
      .join('\n');

    const outputFilePath = path.join(process.cwd(), outputFile);
    await writeFile(outputFilePath, finalResult);
  } catch (_error) {
    if (_error instanceof ZodError) {
      spinner.fail('Invalid configuration file');
    }

    spinner.fail('Failed to read configuration file');
    spinner.stop();
    return;
  }

  spinner.succeed('Content exported');
  spinner.stop();
}
