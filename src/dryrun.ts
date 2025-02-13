import ora from 'ora';
import { ZodError } from 'zod';

import { filesToProcess, loadConfiguration } from './common';

export async function dryRun() {
  const spinner = ora('Dry running current configuration').start();

  try {
    const configuration = await loadConfiguration();
    const files = await filesToProcess(configuration);

    if (files.length === 0) {
      spinner.warn('No files found');
      spinner.stop();
      return;
    }

    spinner.info('Files that will be considered:');
    files.forEach((file) => {
      spinner.info(` 📄 ${file}`);
    });
  } catch (_error) {
    if (_error instanceof ZodError) {
      spinner.fail('Invalid configuration file');
    }

    spinner.fail('Failed to read configuration file');
    spinner.stop();
    return;
  }

  spinner.succeed('Dry run completed');
  spinner.stop();
}
