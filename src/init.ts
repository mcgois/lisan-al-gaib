import ora from 'ora';

export function init() {
  const spinner = ora('Creating lisan-al-gaib configuration').start();

  setTimeout(() => {
    spinner.stop();
  }, 2000);
}
