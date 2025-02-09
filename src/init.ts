import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import ora from 'ora';

import configuration from './configuration';

export async function init() {
  const spinner = ora('Creating lisan-al-gaib configuration file').start();

  const yamlContent = yaml.dump(configuration, {
    sortKeys: true,
  });

  try {
    await fs.writeFile('.lisan-al-gaib.yml', yamlContent);
    spinner.succeed('lisan-al-gaib configuration created');
  } catch (err) {
    spinner.fail('Failed to create lisan-al-gaib configuration');
    return;
  }

  spinner.stop();
}
