const inquirer = require('inquirer');
const del = require('del');
const { join } = require('path');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const {
  // ensureDir, // @todo ensure directory does not exist
  // emptyDir, // @todo empty directory if `config.force`
  mkdir,
} = require('fs-extra');

const store = memFs.create();
const fs = editor.create(store);

async function init(options) {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      default: 'my-site',
      filter: input => input.toLowerCase().replace(/ /g, '-'),
    },
  ]);

  const config = {
    ...options,
    ...answers,
  };

  console.log({ config });

  const theDir = join(process.cwd(), config.name);
  console.log(`Creating directory: ${theDir}`);
  await mkdir(theDir);

  console.log('Copying in starting files...');
  fs.copyTpl(
    join(__dirname, '../templates/foundation/{**,.*}'),
    theDir,
    config,
    {},
  );

  fs.commit(() => {
    console.log('All done!');
  });
}

module.exports = init;
