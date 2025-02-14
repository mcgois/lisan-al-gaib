import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import ora from 'ora';
import { ZodError } from 'zod';

import { loadConfiguration, readContent } from './common';

export async function aiReadme(outputFile: string) {
  const spinner = ora('Ai README').start();

  try {
    const configuration = await loadConfiguration();
    const content = await readContent(configuration);

    const openai = createOpenAI({
      apiKey: configuration.openai.apiKey,
    });
    const { text } = await generateText({
      model: openai(configuration.openai.model),
      system: configuration.system
        .replace('{SRC}', configuration.info.repository)
        .replace('{NAME}', configuration.info.name),
      prompt: content,
    });

    const outputFilePath = path.join(process.cwd(), outputFile);
    await writeFile(outputFilePath, text);
  } catch (_error) {
    if (_error instanceof ZodError) {
      spinner.fail('Invalid configuration file');
    }

    if (_error instanceof Error) {
      spinner.fail(_error.message);
    }

    spinner.fail('Failed to generate README');
    spinner.stop();
    return;
  }

  spinner.succeed('REAME exported');
  spinner.stop();
}
