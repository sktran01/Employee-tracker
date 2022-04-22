const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require ('console.table');
const {startQuestion,addDepartmentQuestion} = require('../db/questions');
// const {viewAllDepartments, viewAllEmployees,chooseTask}= require('./utils/function');

const chooseTask = ()=>{
    inquirer.prompt(startQuestion)
    .then((res)=>{
                     (res.task=='View All Departments')? viewAllDepartments()
                    :(res.task=='View All Roles')?viewAllRoles()
                    :(res.task=='View All Employees')?viewAllEmployees()
                    :(res.task=='Add a Department')?addDepartment()
                    :(res.task=='Add a Role')?addRole()
                    :(res.task=='Add an Employee')?addEmployee()
                    :(res.task=='Update an Employee Role')?updateEmployee()
                    :console.log('Have a nice day!'), db.end
    })   
}

const viewAllDepartments=()=>{
    const sql=`SELECT * FROM department`;
    db.query(sql, (err,res)=>{
        if (err)throw err
        console.log('Viewing All Departments')
        console.table(res)
        chooseTask();
        });

};

const viewAllEmployees=()=>{
    const sql=`SELECT * FROM employee`;
    db.query(sql,(err,res)=>{
        if(err)throw err
        console.log("Viewing All Employees")
        console.table(res)
        chooseTask();
    });
     
}

const viewAllRoles=()=>{
    const sql=`SELECT * FROM role`;
    db.query(sql,(err,res)=>{
        if(err)throw err
        console.log('Viewing All Roles')
        console.table(res)
        chooseTask();
    })
}

const addDepartment=()=>{
    inquirer.prompt(addDepartmentQuestion)
    .then((res)=>{
        const sql=`INSERT INTO department(department_name) VALUE(?)`;
        db.query(sql,res.dept_name,(err,result)=>{
            if(err)throw err
            console.table(result)
            chooseTask();
        });
    });
};

const addRole=()=>{
    const sql=`INSERT INTO role ()`
}

module.exports= chooseTask