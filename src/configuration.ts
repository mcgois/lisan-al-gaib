export type Configuration = {
  'openai-api-token': string;
  includePatterns: string[];
  excludePatterns: string[];
};

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
