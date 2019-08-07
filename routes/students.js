const express = require('express');
const bodyParser = require('body-parser')
const students = express.Router();
students.use(bodyParser.json());




/*
Get /api/students gets all students
*/
students.get('/', (req, res, next) => {
    res.status(200).send("HI");
})

/*
Get /api/students/:id gets student with specific id
*/
students.get('/:id', (req, res, next) => {
    const index = req.params.id;
    const result = studentsArray.find( student => student.id === parseInt(index));
    if(result) {
        res.status(200).send(result);
    } else {
        res.status(404).send("Student not found!");
    }
})

/*
POST /api/students Creates new student
*/
students.post('/', (req, res, next) => {
    const newStudent = req.body;
    if(newStudent) {
        studentsArray.push(newStudent);
        res.status(200).send(studentsArray);
    } else {
        res.status(400).send("Bad Request");
    }
})

/*
PUT /api/students/:id updates student
------
Temp fix -> deleting position and inserting new value
*/
students.put('/:id', (req, res, next) => {
    const index = req.params.id;
    const result = studentsArray.find( student => student.id === parseInt(index));
    const updateStudent = req.body;
    if(result) {
       // studentsArray[result] = updateStudent;
        studentsArray.splice(result,1,updateStudent);
        res.status(200).send(studentsArray);
    } else {
        res.status(400).send("Student not found!");
    }
});

/*
Delete /api/students/:id Deletes student with specific id
*/
students.delete('/:id', (req, res, next) => {
    const index = req.params.id;
    const deleteStudent = studentsArray.find( student => student.id == parseInt(index));
    if(deleteStudent) {
        studentsArray.splice(deleteStudent,1);
        res.status(200).send("Student deleted!");
    } else {
        res.status(400).send("Bad Request");
    }
})


module.exports = students;