//Dependencies declaration
const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require ('console.table');

let employeeChoices=[];
let departmentChoices=[];
let roleChoices=[];
let managerChoices=['No Manager']
let manager=[];
let eEmp;
let eDept;
let eRole

function chooseTask(){
    getDepartList();
    getEmployeeList();
    getRoleList();
    questions();
}
const questions = ()=>{
    inquirer.prompt([
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
                'Update employee managers',
                'Delete a Department',
                'Delete a Role',
                'Delete an employee',
                'View by Manager',
                'View by Department',
                'View Budget',
                'Exit'
            ]
        }
    ])
    .then((res)=>{
                    //tertianary operator for choice selected
                     (res.task=='View All Departments')? viewAllDepartments()
                    :(res.task=='View All Roles')?viewAllRoles()
                    :(res.task=='View All Employees')?viewAllEmployees()
                    :(res.task=='Add a Department')?addDepartment()
                    :(res.task=='Add a Role')?addRole()
                    :(res.task=='Add an Employee')?addEmployee()
                    :(res.task=='Update an Employee Role')?updateEmployee()
                    :(res.task=='Update employee managers')?updateManager()
                    :(res.task=='Delete a Department')?deleteDepartment()
                    :(res.task=='Delete a Role')?deleteRoles()
                    :(res.task=='Delete an employee')?deleteEmployee()
                    :(res.task=='View by Manager')?viewByManager()
                    :(res.task=='View by Department')?viewByDepartment()
                    :(res.task=='View Budget')?viewBudget()
                    :console.log('\n Have a nice day!'), db.end
    });   
};
// function to view all departments
const viewAllDepartments=()=>{
    const sql=`SELECT * FROM department ORDER BY department_id`;
    db.query(sql, (err,res)=>{
        if (err)throw err
        console.log('\n Viewing All Departments \n')
        console.table(res)
        chooseTask();
        });
};
// function to view all employees
const viewAllEmployees=()=>{
    const sql=`SELECT e.employee_id, e.first_name, e.last_name,role.title,department.department_name,role.salary,CONCAT(m.first_name,' ',m.last_name)AS Manager FROM employee e
    JOIN role ON e.role_id=role.role_id
    JOIN department on role.department_id=department.department_id
    LEFT OUTER JOIN employee m ON m.employee_id=e.manager_id
    ORDER BY e.last_name;`
    db.query(sql,(err,res)=>{
        if(err)throw err
        console.log('\n')
        console.log("Viewing All Employees")
        console.log('\n')
        console.table(res)
        chooseTask();
    });
};
// function to view all roles
const viewAllRoles=()=>{
    const sql=`SELECT role.title, role.role_id, department.department_name,role.salary
    FROM role JOIN department on role.department_id=department.department_id ORDER by title`;
    db.query(sql,(err,res)=>{
        if(err)throw err
        console.log('\n Viewing All Roles \n')
        console.table(res)
        chooseTask();
    });
};
//function to add a new department
const addDepartment=()=>{
    inquirer.prompt([
        {
            type:'input',
            name:'dept_name',
            message: 'What is the name of the department',
            validate: function (dept_name){
                if(dept_name){
                    return true;
                }
                console.log('Please enter the department name')
                return false;
            }
        } 
    ])
    .then((res)=>{
        const sql=`INSERT INTO department(department_name) VALUE(?) `;
        db.query(sql,res.dept_name,(err,result)=>{
            if(err){
                console.log('\n This department already exist! \n')
                chooseTask();
                return 
            }
            console.log(`\n ${res.dept_name} department added! See department table\n`)
            viewAllDepartments();
        });
    });
};
// add new role function
const addRole=()=>{
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the job title of the new role?',
                    validate: function (title){
                        if(title){
                        return true;
                        }
                        console.log('Please enter a job title')
                        return false;
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message:'What is the salary for the new role?(Enter the number amount)',
                    validate: function (salary){
                        if(salary && isNaN(salary)==false){
                            return true;
                        }
                        console.log('Please input the salary as a number')
                        return false;
                    }
                },
                {
                    type: 'list',
                    name: 'dept_id',
                    message: 'Choose the department for the new role',
                    choices: departmentChoices  
                }
            ])
            .then((res)=>{
                let new_id;
                //loop over the result array to find the department_name that's the same as the choice selected then assign the appropriate department id
                eDept.map(id=>{
                    if(id.department_name===res.dept_id)
                    new_id=id.department_id;
                });
                const sql=`INSERT INTO role (title, salary,department_id)
                           VALUES (?,?,?)`;
                const params = [res.title,res.salary,new_id];
                db.query(sql,params,(err,result)=>{
                    if(err){
                        console.log('\n This title already exist! \n')
                        chooseTask();
                        return
                    }
                    if(err)throw err
                    console.log(`\n\n ${res.title} added!`)
                    viewAllRoles();
                });
            }); 
};
//add Employees function
const addEmployee=()=>{
        inquirer.prompt([
            {
                type:'input',
                name: 'firstname',
                message: "What is the new employee's first name?",
                validate: function (firstname){
                    if(firstname){
                    return true;
                    }
                    console.log("Please enter employee's first name")
                    return false;
                }
            },
            {
                type:'input',
                name: 'lastname',
                message: "what is the new employee's last name?",
                validate: function (lastname){
                    if(lastname){
                    return true;
                    }
                    console.log("Please enter employee's last name")
                    return false;
                }
            },
            {
                type:'list',
                name:'employeetitle',
                message:"What is the employee's title",
                choices:roleChoices
            },
            {
                type:'list',
                name:'manager',
                message:'Who is the manager for this employee?',
                choices: managerChoices

            }
        ])
        .then((res)=>{
            let new_id;
            //loop over the result array to find the department_name that's the same as the choice selected then assign the appropriate department id
            eRole.map(id=>{
                if(id.title===res.employeetitle)
                new_id=id.role_id;
            })
            let m_id;
            let noManager={
                fullName: 'No Manager',
                employee_id: null
            }
            eEmp.push(noManager)
            eEmp.map(e_id=>{
                if(e_id.fullName===res.manager)
                m_id=e_id.employee_id
            })
            const sql=`INSERT INTO employee (first_name, last_name, role_id,manager_id)
            VALUES (?,?,?,?)`;
            const params=[res.firstname,res.lastname,new_id,m_id]
            db.query(sql,params,(err,row)=>{
                if(err)throw err
                console.log(`\n\n ${res.firstname} ${res.lastname} added!`)
                viewAllEmployees();
            });
        });
};
//update employee function
const updateEmployee=()=>{
        inquirer.prompt([
            {
                type:'list',
                name:'employeename',
                message: "Whose role do you want to update?",
                choices: employeeChoices 
            },
            {
                type:'list',
                name:'newtitle',
                message:"What is the employee's new title?",
                choices: roleChoices
            }
        ])
        .then((res)=>{
            //convert employee names to appropriate employee's id by looping thru the result for corresponding choice
            let employeeid;
            eEmp.map(employee=>{
                if(employee.fullName===res.employeename)
                employeeid=employee.employee_id
            })
            //finding the corresponding role_id to role title by looping thru the list of titles to match the choosen title
            let roleid;
            eRole.map(role=>{
                if(role.title===res.newtitle)
                roleid=role.role_id
            })
            //query update the employeeDB
            const params = [{role_id:roleid},{employee_id:employeeid}]
            db.query(`UPDATE employee SET? WHERE?`,params,(err,row)=>{
                if (err)throw err;
                console.log(`\n\n success! ${res.employeename}'s role updated`)
                viewAllEmployees()
            });       
        });
};
//update Manager function
const updateManager=()=>{
    inquirer.prompt([
        {
            type:'list',
            name:'employeename',
            message: "Which employee do you need to update the manager?",
            choices: employeeChoices 
        },
        {
            type:'list',
            name:'newmanager',
            message:"Who is the new manager?",
            choices: managerChoices
        }
    ])
    .then((res)=>{
        let employeeid;
        eEmp.map(employee=>{
            if(employee.fullName===res.employeename)
            employeeid=employee.employee_id
        })
            let noManager={
                fullName: 'No Manager',
                employee_id: null
            }
            eEmp.push(noManager)
            let mangid;
            eEmp.map(employee=>{
                if(employee.fullName===res.newmanager)
                mangid=employee.employee_id
            })
        const params = [{manager_id:mangid},{employee_id:employeeid}]
            db.query(`UPDATE employee SET? WHERE?`,params,(err,row)=>{
                if (err)throw err;
                console.log(`\n\n success! ${res.employeename}'s manager updated`)
                viewAllEmployees()
            });
    });
};
//delete a department
const deleteDepartment=()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'delete',
            message: 'Which department do you want to delete?',
            choices: departmentChoices
        }
    ])
    .then((res)=>{
        let new_id;
                //loop over the result array to find the department_name that's the same as the choice selected then assign the appropriate department id
                eDept.map(id=>{
                    if(id.department_name===res.delete)
                    new_id=id.department_id;
                });
        const params=[{department_id:new_id}]
        db.query(`DELETE FROM department WHERE?`,params,(err,result)=>{
            if(err)throw err;
            console.log(`\n\n ${res.delete} department deleted!`)
            viewAllDepartments();
        });
    });
};
//Delete a role
const deleteRoles=()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'delete',
            message: 'Which role do you want to delete?',
            choices: roleChoices
        }
    ])
    .then((res)=>{
        //finding the corresponding role_id to role title by looping thru the list of titles to match the choosen title
        let roleid;
        eRole.map(role=>{
            if(role.title===res.delete)
            roleid=role.role_id
        })
        const params=[{role_id:roleid}]
        db.query(`DELETE FROM role WHERE?`,params,(err,result)=>{
            if(err)throw err;
            console.log(`\n\n ${res.delete} deleted!`)
            viewAllRoles();
        });
    });
};
// Delete an employee
const deleteEmployee=()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'delete',
            message: 'Which employee do you want to delete?',
            choices: employeeChoices
        }
    ])
    .then((res)=>{
        let employeeid;
        eEmp.map(employee=>{
            if(employee.fullName===res.delete)
            employeeid=employee.employee_id
        })
        const params=[{employee_id:employeeid}]
        db.query(`DELETE FROM employee WHERE?`,params,(err,result)=>{
            if(err)throw err;
            console.log(`\n\n ${res.delete} deleted!`)
            viewAllEmployees();
        });
    });
};
//view employee by manager
const viewByManager=()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'manager',
            message: " What is the name of the manager?",
            choices: employeeChoices
        }
    ])
    .then((res)=>{
    let employeeid;
    eEmp.map(employee=>{
        if(employee.fullName===res.manager)
        employeeid=employee.employee_id
    });
    const params = employeeid
    db.query(`SELECT first_name, last_name, manager_id FROM employee WHERE manager_id = ?`,params,(err,result)=>{
        if(err)throw err
            if(err)throw err;
            if (result.length ==0){
            console.log (`\n\n${res.manager} is not a manager \n\n`)
            chooseTask()
            }else{
            console.log(`\n\n${res.manager} is the manager for the following employee(s)\n\n`  )
            console.table(result);
            chooseTask()
            }
        });
    })
};
// view by department
const viewByDepartment=()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'dept',
            message: " Which department do you want to look at?",
            choices: departmentChoices
        }
    ])
    .then((res)=>{
        const sql=`SELECT e.first_name, e.last_name,role.title,department.department_name FROM employee e
           JOIN role ON e.role_id=role.role_id
           JOIN department on role.department_id=department.department_id
           WHERE department.department_name=?`
        db.query(sql,res.dept,(err,result)=>{
            if(err)throw err
            if(result.length==0){
                console.log(`\n\nThere is no employee in the ${res.dept} department\n\n`)
                chooseTask()
            }else{
            console.log(`\n\nThe following employee(s) is/are in the ${res.dept} department\n`)
            console.table(result)
            chooseTask()
            }
        });
    });
};
//view utilized budget of a department
const viewBudget=()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'dept',
            message: " Which department's budget do you want to look at?",
            choices: departmentChoices
        }
    ])
    .then((res)=>{
        const sql=`SELECT e.first_name, e.last_name,role.title,role.salary,department.department_name FROM employee e
        JOIN role ON e.role_id=role.role_id
        JOIN department on role.department_id=department.department_id
        WHERE department.department_name=?`

        db.query(sql,res.dept,(err,result)=>{
            if(err)throw err
            console.log('\n\n')
            console.table(result)
          let salaries=(result.map(cost=>cost.salary)).map(Number)
          let budget=salaries.reduce((total,amount)=>total+amount);
            console.log(`${res.dept} department has ${result.length} employee(s) for a total budget of $${budget}.\n\n`)
            chooseTask()
        });
    });
};
//get employee choices array
const getEmployeeList=()=>{
    employeeChoices=[];
    managerChoices=['No Manager']
    const sql=`SELECT CONCAT(employee.last_name, ',',employee.first_name)AS fullName,employee_id,manager_id
    FROM employee ORDER by fullName`;
    db.query(sql,(err,res)=>{
        if(err)throw err
        employeeChoices=res.map(emp=>emp.fullName)
        managerChoices.unshift(...employeeChoices)
        eEmp=res
    });
};
// get department choices array
const getDepartList=()=>{
departmentChoices=[];
    const sql=`SELECT * FROM department ORDER BY department_name`;
        db.query(sql,(err,res)=>{
            if(err)throw err
            departmentChoices=res.map(department =>department.department_name)
            eDept=res
        });
};
// get role choices array
const getRoleList=()=>{
roleChoices=[];
    const sql=`SELECT * FROM role ORDER by title`;
    db.query(sql,(err,res)=>{
        if(err)throw err;
        roleChoices=res.map(role=>role.title)
        eRole=res
    });
};

module.exports= chooseTask;