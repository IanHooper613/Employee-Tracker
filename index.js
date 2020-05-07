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
              'Add a department',
              'Add an employment role',
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
           case 'Add a department':
               addDepartment();
               break

           case 'Add an employment role':
               addRole();
               break   

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
            console.log('Your new department has been added')
            startQuestions()
        })
    })
}

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
            console.log('Your employee role has been added')
            startQuestions()
        })
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