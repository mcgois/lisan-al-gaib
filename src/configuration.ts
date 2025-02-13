import { z } from 'zod';

export const configurationSchema = z.object({
  'openai-api-token': z.string(),
  includePatterns: z.array(z.string()).nonempty(),
  excludePatterns: z.array(z.string()),
});

export type Configuration = z.infer<typeof configurationSchema>;

const configuration: Configuration = {
  'openai-api-token': 'YOUR_OPENAI_API_TOKEN',
  includePatterns: [
    '**/*.md',
    '**/*.txt',
    '**/*.xml',
    '**/*.java',
    '**/*.jte',
    '**/*.yaml',
    '**/*.yml',
    '**/*.graphqls',
    '**/*.properties',
  ],
  excludePatterns: [
    '.lisan-al-gaib.yml',
    '.mvn/**',
    '.idea/**',
    'target/**',
    '.gitignore',
    '.gitattributes',
    'mvnw',
    'mvnw.cmd',
    'gradlew',
  ],
};

export default configuration;
