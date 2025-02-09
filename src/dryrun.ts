import fs from 'node:fs/promises';
import { glob } from 'glob';
import yaml from 'js-yaml';
import ora from 'ora';

import type { Configuration } from './configuration';

export async function dryRun() {
  const spinner = ora('Dry running current configuration').start();

  try {
    spinner.info('Reading configuration file');
    const data = await fs.readFile('.lisan-al-gaib.yml', 'utf8');
    const configuration = yaml.load(data) as Configuration;

    const includePatterns = configuration['lisan-al-gaib'].includePatterns;
    const excludePatterns = configuration['lisan-al-gaib'].excludePatterns;

    const files = await glob(includePatterns, {
      cwd: process.cwd(),
      nodir: true,
      ignore: excludePatterns,
    });

    if (files.length === 0) {
      spinner.warn('No files found');
      spinner.stop();
      return;
    }

    spinner.info('Files found:');
    files.forEach((file) => {
      spinner.info(` 📄 ${file}`);
    });
  } catch (error) {
    spinner.fail('Failed to read configuration file');
    spinner.stop();
    return;
  }

  spinner.succeed('Dry run completed');
}
