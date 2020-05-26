const db = require('./db');
const { prompt } = require('inquirer');
const { printTable } = require('console-table-printer');

// View all employees of db
const viewAllEmployees = () => {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id = department.id;`,
    (err, data) => {
      if (err) throw err;
      printTable(data);
      mainMenu();
    }
  );
};
// View department table of db
const viewDepartment = () => {
  db.query('SELECT * FROM employment_db.department;', (err, data) => {
    if (err) throw err;
    printTable(data);
    mainMenu();
  });
};
// View role table of db
const viewRole = () => {
  db.query('SELECT * FROM employment_db.role;', (err, data) => {
    if (err) throw err;
    printTable(data);
    mainMenu();
  });
};
// View employee tableof db
const viewEmployee = () => {
  db.query('SELECT * FROM employment_db.employee;', (err, data) => {
    if (err) throw err;
    printTable(data);
    mainMenu();
  });
};

// Add a new department row into db
const addDepartment = () => {
  prompt({
    type: 'input',
    name: 'dptName',
    message: 'what department name do you want to add?',
  }).then((answer) => {
    db.query(
      `INSERT INTO department (name) VALUES ('${answer.dptName} Department');`,
      (err, data) => {
        if (err) throw err;
        viewDepartment();
      }
    );
  });
};
// Add a new role row into db
const addRole = () => {
  db.query('SELECT * FROM department', (err, result) => {
    if (err) throw err;
    departments = result.map((dep) => {
      return { name: dep.name, value: dep.id };
    });
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
        type: 'list',
        name: 'dptId',
        message: 'what is the department id for this new role?',
        choices: departments,
      },
    ]).then((answer) => {
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.dptId});`,
        (err, data) => {
          if (err) throw err;
          viewRole();
        }
      );
    });
  });
};

// Add a new employee into db
const addEmployee = () => {
  db.query('SELECT * FROM role', (err, result) => {
    if (err) throw err;
    let role_ids = result.map((role) => {
      return { name: role.title, value: role.id };
    });
    prompt([
      {
        type: 'input',
        name: 'fName',
        message: 'what is the first name of this new employee?',
      },
      {
        type: 'input',
        name: 'lName',
        message: 'what is the last name of this new employee?',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'what role id is for this new employee?',
        choices: role_ids,
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'what manager id is for this new employee?',
        choices: [1, 2, 3, 4, { name: 'None', value: 'NULL' }],
      },
    ]).then((answer) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES("${answer.fName}", "${answer.lName}", ${answer.roleId}, ${answer.managerId});`,
        (err, data) => {
          if (err) throw err;
          viewEmployee();
        }
      );
    });
  });
};
// Update a role by title
const updateRole = () => {
  db.query('SELECT * FROM employee', (err, result) => {
    if (err) throw err;
    let emp_name = result.map((emp) => {
      return emp.first_name;
    });
    db.query('SELECT * FROM role', (err, result) => {
      if (err) throw err;
      let role_list = result.map((role) => {
        return { name: role.title, value: role.id };
      });
      prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'whose role do want to upate?',
          choices: emp_name,
        },
        {
          type: 'list',
          name: 'newrole',
          message: 'which role do you want to update with?',
          choices: role_list,
        },
      ]).then((answer) => {
        db.query(
          `UPDATE employee SET role_id = ${answer.newrole} WHERE first_name = '${answer.employee}';`,
          (err, data) => {
            if (err) throw err;
            viewEmployee();
          }
        );
      });
    });
  });
};
// Delete a department
const deleteDepartment = () => {
  db.query('SELECT * FROM department', (err, result) => {
    if (err) throw err;
    departments = result.map((dep) => {
      return { name: dep.name, value: dep.id };
    });
    prompt({
      type: 'list',
      name: 'dep_id',
      message: 'which department do you want to remove?',
      choices: departments,
    }).then((answer) => {
      db.query(
        `DELETE FROM department WHERE id = ${answer.dep_id};`,
        (err, data) => {
          if (err) throw err;
          viewDepartment();
        }
      );
    });
  });
};

// Delete a role
const deleteRole = () => {
  db.query('SELECT * FROM role', (err, result) => {
    if (err) throw err;
    roles = result.map((role) => {
      return { name: role.title, value: role.id };
    });
    prompt({
      type: 'list',
      name: 'role_id',
      message: 'which role do you want to remove?',
      choices: roles,
    }).then((answer) => {
      db.query(
        `DELETE FROM role WHERE id = ${answer.role_id};`,
        (err, data) => {
          if (err) throw err;
          viewRole();
        }
      );
    });
  });
};

// Delete an employee
const deleteEmployee = () => {
  db.query('SELECT * FROM employee', (err, result) => {
    if (err) throw err;
    let emp_name = result.map((emp) => {
      return { name: emp.first_name, value: emp.id };
    });
    prompt({
      type: 'list',
      name: 'empId',
      message: 'which employee do you want to remove?',
      choices: emp_name,
    }).then((answer) => {
      db.query(
        `DELETE FROM employee WHERE id = ${answer.empId};`,
        (err, data) => {
          if (err) throw err;
          viewEmployee();
        }
      );
    });
  });
};

// Main menu function
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
      'Delete a department',
      'Delete a role',
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
        case 'Delete a department':
          deleteDepartment();
          break;
        case 'Delete a role':
          deleteRole();
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

// Initiating mainMenu
mainMenu();
