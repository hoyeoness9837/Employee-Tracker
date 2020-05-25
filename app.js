const db = require('./db');
const { prompt } = require('inquirer');
const { printTable } = require('console-table-printer');

// view all employees db
const viewAllEmployees = () => {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id = department.id;`,
    (err, data) => {
      if (err) {
        console.log(err);
      }
      printTable(data);
      mainMenu();
    }
  );
};
//view department table
const viewDepartment = () => {
  db.query('SELECT * FROM employment_db.department;', (err, data) => {
    if (err) {
      console.log(err);
    }
    printTable(data);
    mainMenu();
  });
};
//view role table
const viewRole = () => {
  db.query('SELECT * FROM employment_db.role;', (err, data) => {
    if (err) {
      console.log(err);
    }
    printTable(data);
    mainMenu();
  });
};
//view employee table
const viewEmployee = () => {
  db.query('SELECT * FROM employment_db.employee;', (err, data) => {
    if (err) {
      console.log(err);
    }
    printTable(data);
    mainMenu();
  });
};

// Add a new Department into db
const addDepartment = () => {
  prompt({
    type: 'input',
    name: 'dptName',
    message: 'what department name do you want to add?',
  }).then((answer) => {
    db.query(
      `INSERT INTO department (name) VALUES ('${answer.dptName} Department');`,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        viewDepartment();
      }
    );
  });
};
// Add a new role into db
const addRole = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'what role title do you want to add?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'How much salary does this new role need?',
    },
    {
      type: 'input',
      name: 'departmentID',
      message: 'what is the department id for this new role?', // how to do it dynamically?
    },
  ]).then((answer) => {
    db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.departmentID});`,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        viewRole();
      }
    );
  });
};
// Add a new employee into db
const addEmployee = () => {
  prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'what is the first name of this new employee?',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'what is the last name of this new employee?',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'what role id is for this new employee?', // how to do it dynamically?
    },
    // {
    //   type: 'input',
    //   name: 'managerId',
    //   message: 'what manager id is for this new employee?', // how to do it dynamically?
    // },
  ]).then((answer) => {
    db.query(
      `INSERT INTO employee (first_name, last_name, role_id) 
      VALUES("${answer.firstName}", "${answer.lastName}", ${answer.roleId});`,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        viewEmployee();
      }
    );
  });
};
//update a role
const updateRole = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'what role title do you want to update?', // how to do it dynamically, select from list
    },
    {
      type: 'input',
      name: 'salary',
      message: 'How much salary does this updating role need?',
    },
  ]).then((answer) => {
    db.query(
      `UPDATE role SET salary = ${answer.salary} WHERE title = '${answer.title}';`,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        viewRole();
      }
    );
  });
};

const deleteEmployee = () => {
  prompt({
    type: 'input',
    name: 'employeeId',
    message: 'what is the id of an employee you want to delete?',
  }).then((answer) => {
    db.query(
      `DELETE FROM employee WHERE id = ${answer.employeeId};`,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        viewEmployee();
      }
    );
  });
};

//main menu function
const mainMenu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'what would you like to do?',
    choices: [
      'View all employees',
      'View department table',
      'View role table',
      'View employee table',
      'Add a new department',
      'Add a new role',
      'Add a new employee',
      'Update employee role',
      'Delete an employee',
      'EXIT',
    ],
  })
    .then(({ action }) => {
      switch (action) {
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'View department table':
          viewDepartment();
          break;
        case 'View role table':
          viewRole();
          break;
        case 'View employee table':
          viewEmployee();
          break;
        case 'Add a new department':
          addDepartment();
          break;
        case 'Add a new role':
          addRole();
          break;
        case 'Add a new employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateRole();
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'EXIT':
          process.exit();
          break;
      }
    })
    .catch((err) => console.log(err));
};

mainMenu();