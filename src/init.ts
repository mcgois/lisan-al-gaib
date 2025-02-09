import fs from 'node:fs';
import yaml from 'js-yaml';
import ora from 'ora';

import configuration from './configuration';

export function init() {
  const spinner = ora('Creating lisan-al-gaib configuration file').start();

  const yamlContent = yaml.dump(configuration, {
    sortKeys: true,
  });

  fs.writeFile('.lisan-al-gaib.yml', yamlContent, (err) => {
    if (err) {
      spinner.fail('Failed to create lisan-al-gaib configuration');
    } else {
      spinner.succeed('lisan-al-gaib configuration created');
    }

    spinner.stop();
  });
}
