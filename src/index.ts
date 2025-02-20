import { Command } from 'commander';

import { aiReadme } from './ai';
import { dryRun } from './dryrun';
import { exportContent } from './export';
import { init } from './init';

const program = new Command();

program.name('lisan-al-gaib').description('README generator using LLMs').version('0.0.1');

// init command
program.command('init').description('Setup configuration').action(init);

// dry-run command
program.command('dry-run').description('Dry Run configuration').action(dryRun);

// export content command
program
  .command('export-content')
  .description('Export content')
  .argument('<output>', 'Output file')
  .action(exportContent);

// export ai readme
program
  .command('ai-readme')
  .description('Generate a README file using AI')
  .argument('<output>', 'Output file')
  .action(aiReadme);

program.parse();
