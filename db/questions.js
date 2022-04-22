// import inquirer from "inquirer";
const startQuestion = [
    {
        type: "list",
        name: 'task',
        message: "What would you like to do?",
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
    }];

    const addDepartmentQuestion=[
        {
            type:'input',
            name:'dept_name',
            message: 'What is the name of the department',
            validate: function (dept_name){
                dept_name?true:console.log ('Please enter a department name') ,false
            }
        }
    ];

    const addRoleQuestion=[
        {
            type: 'input',
            name: 'title',
            message: 'What is the job title of the new role?',
            validate: function (titleInput){
                titleInput?true:console.log ('Please enter a job title') ,false
            }
              
        },
        {
            type: 'input',
            name: 'salary',
            message:'What is the salary for the new role',
            validate: function (salary){
                salary || isNaN(salary)?true:console.log ('Please enter a salary amount') ,false
            }
        },
        {
            type: 'list',
            name: 'dept_id',
            message: 'What is the department ID for the new role?',
            choices: []
        }
    ]


    module.exports={startQuestion,addDepartmentQuestion};