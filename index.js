//Adding Dependencies
var mysql = require('mysql')
var inquirer = require('inquirer')

//Allows the opening script of application
const showBanner = require('node-banner')


//Creates connection to the Mysql database
var connection = mysql.createConnection({
    //host    
    host: 'localhost',
    //your port
    port: 3306,
    //Your username
    user: 'root',
    //Your password
    password: 'password',
    database: 'company_db'
});


//Opening logo (banner) display
(async () => {
    await showBanner('Employee Tracker','','blue')
})();


//Connection
connection.connect(function(error) {
    if (error) throw error;
    startQuestions();
});


//Build a command-line application that that allows the user to:
// * Add departments, roles, employees
// * View departments, roles, employees
// * Update employee roles

//Initial Start Function
function startQuestions() {
    inquirer
      .prompt({
          name: 'action',
          type: 'rawlist',
          message: 'What would you like to do?',
          choices: [
              'Add a department',
              'Add an employment role',
              'Add an employee',
              'View all departments',
              'View all employment roles',
              'View all employees',
              'Update an employee role',
              'Quit'
          ]
      })
       .then(function(answer) {
           switch(answer.action) {
           //Adds a department    
           case 'Add a department':
               addDepartment();
               break
           //Adds a role 
           case 'Add an employment role':
               addRole();
               break   
           //Adds an employee 
           case 'Add an employee':
                addEmployee();
                break    
           //Views all departments 
           case 'View all departments':
                viewByDepartment();
                break 
           //Views all roles     
           case 'View all employment roles':
                viewRoles();
                break  
           //Views all employees 
           case 'View all employees':
               viewEmployees();
               break              
           //Updates an employee role 
           case 'Update an employee role':
                updateRole();
                break
           //Exits the application       
              case 'Quit':
                connection.end();      
           }
       })
}


//Adding a department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What department would you like to add?'
        }
    ]).then(function(response) {
        connection.query('INSERT INTO department SET ?', 
        {name: response.deptName}, function(error) {
            if (error) throw error
            console.log('==================================')
            console.log('Your new department has been added')
            console.log('==================================')
            startQuestions()
        })
    })
}

//Adding a role
function addRole() {
     let department = []
     connection.query('SELECT * FROM department', function(error, response) {
         if (error) throw error
         for (let i = 0; i < response.length; i++) {
             department.push({name: response.name, value: response.id})
         }
        
    })
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the role?',
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'What is the department Id number?',
            choices: department,
        }
    ]).then(function(response) {
        connection.query('INSERT INTO role SET ?', 
        {title: response.roleTitle,
        salary: response.salary,
        department_id: response.deptId},
        function(error) {
            if (error) throw error
            console.log('=================================')
            console.log('Your employee role has been added')
            console.log('=================================')
            startQuestions()
        })
    })
}

//Adding an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is their role Id number?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager Id?',
            default: 0
        }
    ]).then(function(response) {
        connection.query('INSERT INTO employee SET ?', 
        {first_name: response.firstName,
        last_name: response.lastName,
        role_id: response.roleId,
        manager_id: response.managerId},
        function(error) {
            if (error) throw error
            console.log('===========================')
            console.log('Employee added successfully')
            console.log('===========================')
            startQuestions()
         }
        )
    })
}

//Viewing all departments
function viewByDepartment () {
    connection.query('SELECT * FROM department', function(error, res) {
        if (error) throw error;
        console.table(res)
        startQuestions()
    })
}

//Viewing all roles in company
function viewRoles() {
    connection.query('SELECT role.id, role.title, department.name, role.salary FROM role JOIN department ON department.id = role.id', function(error, res) {
        if (error) throw error;
        console.table(res)
        startQuestions()
    })
}

//Viewing all employees in company
function viewEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, manager_id FROM employee', function(error, res) {
        if (error) throw error;
        console.table(res);
        startQuestions()
    })
}

//Updates an employee role
function updateRole() {
    connection.query('SELECT first_name, last_name, id FROM employee', function(error, response) {
        if (error) throw error
        let employee = response.map(employee =>({
            name: employee.first_name + '' + employee.last_name
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: 'Which employee would you like to update?',
                choices: employee
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'What is their new role?'
            },
        ]).then(function(response) {
            connection.query('UPDATE role SET title = ?', 
            {title: response.newRole}),
            function(error) {
                if(error) throw error
                console.log('===================================')
                console.log('Your employee role has been updated')
                console.log('===================================')
            }
            startQuestions()
        })
    })
}