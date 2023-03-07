const run = async () => {
  // Use dynamic import instead of require for inquirer
  const { default: inquirer } = await import('inquirer');
};
const fs = require("fs");
const path = require("path");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

function init() {
    console.log("Welcome to the Team Profile Generator.");
    promptManager();
  }

  function promptManager() {
    inquirer.prompt([
      {
        type: "input",
        message: "Enter the name of the team manager:",
        name: "name"
      },
      {
        type: "input",
        message: "Enter the ID of the team manager:",
        name: "id"
      },
      {
        type: "input",
        message: "Enter the email address of the team manager:",
        name: "email"
      },
      {
        type: "input",
        message: "Enter the office number of the team manager:",
        name: "officeNumber"
      }
    ]).then(function (answers) {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      employees.push(manager);
      promptAddEmployee();
    });
  }
  

  function promptEngineer() {
    inquirer.prompt([
      {
        type: "input",
        message: "Enter the name of the engineer:",
        name: "name"
      },
      {
        type: "input",
        message: "Enter the ID of the engineer:",
        name: "id"
      },
      {
        type: "input",
        message: "Enter the email address of the engineer:",
        name: "email"
      },
      {
        type: "input",
        message: "Enter the GitHub username of the engineer:",
        name: "github"
      }
    ]).then(function (answers) {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      employees.push(engineer);
      promptAddEmployee();
    });
  }
  

  function promptIntern() {
    inquirer.prompt([
      {
        type: "input",
        message: "Enter the name of the intern:",
        name: "name"
      },
      {
        type: "input",
        message: "Enter the ID of the intern:",
        name: "id"
      },
      {
        type: "input",
        message: "Enter the email address of the intern:",
        name: "email"
      },
      {
        type: "input",
        message: "Enter the name of the intern's school:",
        name: "school"
      }
    ]).then(function (answers) {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      employees.push(intern);
      promptAddEmployee();
    });
  }
  
  function promptAddEmployee() {
    inquirer.prompt([
      {
        type: "list",
        message: "What type of employee would you like to add?",
        choices: ["Engineer", "Intern", "Finish building team"],
        name: "employeeType"
      }
    ]).then(function (answer) {
      switch (answer.employeeType) {
        case "Engineer":
          promptEngineer();
          break;
        case "Intern":
          promptIntern();
          break;
        default:
          writeToFile(outputPath, render(employees));
      }
    });
  }
  

  function writeToFile(fileName, data) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFile(fileName, data, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Successfully created team.html in the output directory.");
    });
  }
  

init();
