// Import required packages
const inquirer = require('inquirer'); // For user input
const fs = require('fs'); // For file operations

// Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?', // Ask for the project title
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:', // Ask for the project description
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How can someone install your project?', // Ask for installation instructions
  },
  {
    type: 'input',
    name: 'usage',
    message: 'How should your project be used?', // Ask how the project should be used
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project. [Hit Enter to skip]', // Ask for the project license
    default: '',
    choices: ['MIT', 'GPL-3.0', 'Apache-2.0', 'None'], // License choices
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'How can others contribute to your project?', // Ask how others can contribute
  },
  {
    type: 'input',
    name: 'tests',
    message: 'How can someone run tests on your project?', // Ask how to run tests
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username? [Hit Enter to skip]', // Ask for GitHub username
    default: '',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? [Hit Enter to skip]', // Ask for email address
    default: '',
  },
];

// Prompt the user for input using the defined questions
inquirer
  .prompt(questions)
  .then((answers) => {
    // Generate the README content using user-provided data
    const readmeContent = generateReadme(answers);

    // Write the README.md file
    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Successfully created README.md!');
      }
    });
  });

// Create a function to generate README content based on user input
function generateReadme(data) {
  // Create a variable to store the license badge based on the user's input
  let licenseBadge = '';

  // Check the selected license and generate the appropriate badge
  if (data.license === 'MIT') {
    licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
  } else if (data.license === 'GPL-3.0') {
    licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
  } else if (data.license === 'Apache-2.0') {
    licenseBadge = '[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
  } else {
    // Handle the case where "None" or an unrecognized license is selected
    licenseBadge = 'This project is not licensed.';
  }

  // Create a GitHub link if the username is provided
  const githubLink = data.github
    ? `You can also reach out to me on [GitHub](https://github.com/${data.github}).`
    : '';

  // Generate the complete README content
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