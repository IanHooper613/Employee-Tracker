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
              'Update an employee role',
              'Update an employee manager',
              'Quit'
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
              
           case 'Add an employee':
               addEmployee();
               break
              
    //        case 'Remove an employee':
    //            removeEmployee();
    //            break

            case 'Update an employee role':
                updateRole();
                break
               
    //        case 'Update an employee manager':
    //            updateManager();
                  //break
                  
              //case 'Quit'    
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
            console.log('Employee added successfully')
            startQuestions()
         }
        )
    })
}

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
                startQuestions()
            }
            startQuestions()
        })
    })
}