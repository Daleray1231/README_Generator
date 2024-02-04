const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How can someone install your project?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'How should your project be used?',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project. [Hit Enter to skip]',
    default: '',
    choices: ['MIT', 'GPL-3.0', 'Apache-2.0', 'None'],
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'How can others contribute to your project?',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'How can someone run tests on your project?',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username? [Hit Enter to skip]',
    default: '',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? [Hit Enter to skip]',
    default: '',
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    const readmeContent = generateReadme(answers);

    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Successfully created README.md!');
      }
    });
  });

function generateReadme(data) {
  let licenseBadge = '';

  if (data.license === 'MIT') {
    licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
  } else if (data.license === 'GPL-3.0') {
    licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
  } else if (data.license === 'Apache-2.0') {
    licenseBadge = '[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
  } else {
    licenseBadge = 'This project is not licensed.';
  }

  const githubLink = data.github
    ? `You can also reach out to me on [GitHub](https://github.com/${data.github}).`
    : '';

  return `
# ${data.title}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
${licenseBadge}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
For any questions or feedback, please feel free to contact me at ${data.email}.

${githubLink}
`;
}

