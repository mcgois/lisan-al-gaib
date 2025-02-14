import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import ora from 'ora';
import { ZodError } from 'zod';

import { loadConfiguration, readContent } from './common';

export async function exportContent(outputFile: string) {
  const spinner = ora('Exporting content').start();

  try {
    const configuration = await loadConfiguration();
    const content = await readContent(configuration);
    const outputFilePath = path.join(process.cwd(), outputFile);
    await writeFile(outputFilePath, content);
  } catch (_error) {
    if (_error instanceof ZodError) {
      spinner.fail('Invalid configuration file');
    }

    if (_error instanceof Error) {
      spinner.fail(_error.message);
    }

    spinner.fail('Failed to read configuration file');
    spinner.stop();
    return;
  }

  spinner.succeed('Content exported');
  spinner.stop();
}
