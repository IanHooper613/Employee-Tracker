var mysql = require('mysql')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Beckham8*',
    database: 'company_db'
});

connection.connect(function(error) {
    if (error) throw error;
    startQuestions();
});

function startQuestions() {
    inquirer
      .prompt({
          name: 'action',
          type: 'rawlist',
          message: 'What would you like to do?',
          choices: [
              'View all employees',
              'View all employees by department',
              'View all employees by manager',
              'Add an employee',
              'Remove an employee',
              'Update an emploee role',
              'Update an employee manager'
          ]
      })
       .then(function(answer) {
           switch(answer.action) {
           case 'View all employees':
               viewEmployees();
               break;
              
           case 'View all employees by department':
               viewByDepartment();
               break
              
           case 'View all employees by manager':
               viewByManager();
               break
              
    //       case 'Add an employee':
    //           addEmployee();
    //           break
              
    //        case 'Remove an employee':
    //            removeEmployee();
    //            break

    //        case 'Update an emploee role':
    //            updateRole();
    //            break
               
    //        case 'Update an employee manager':
    //            updateManager();    
           }
       })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee', function(error, res) {
        if (error) throw error;
        console.log(res);
        startQuestions()
    })
}

function viewByDepartment () {
    connection.query('SELECT * FROM department', function(error, res) {
        if (error) throw error;
        console.log(res)
        startQuestions()
    })
}

function viewByManager () {
    connection.query('SELECT * FROM employee WHERE manager_id IS NOT NULL', function(error, res) {
    //connection.query('SELECT * FROM employee WHERE manager_id IN (1,2,3,4)', function(error, res) {
        if (error) throw error;
    //connection.query('SELECT * FROM employee WHERE manager_id IS NULL', function(error) {
      //  if (error) throw error;
        console.log(res)
        startQuestions()
    })    
    //})
}