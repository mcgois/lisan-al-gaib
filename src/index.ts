import { Command } from 'commander';

import { init } from './init';

const program = new Command();

program.name('lisan-al-gaib').description('README generator using LLMs').version('0.0.1');

// init command
program.command('init').description('Setup configuration').action(init);

program.parse();
