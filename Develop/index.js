const inquirer = require('inquirer');
const fs = require('fs');

// Create an array of questions for user input
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
    type: 'input',
    name: 'license',
    message: 'What is the project license?',
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
    name: 'questions',
    message: 'How can users reach out to you with questions?',
  },
];

// Prompt the user for input
inquirer
  .prompt(questions)
  .then((answers) => {
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

// Create a function to generate README content
