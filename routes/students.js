const express = require('express');
const bodyParser = require('body-parser')
const students = express.Router();

students.use(bodyParser.json());

const studentsArray = [
    {
    "id": 4,
    "firstName": "Jerry",
    "lastName": "Jingle",
    "email": "jerryjingle@bells.com",
    "imageUrl": "http://i.imgur.com/AItCxSs.jpg",
    "gpa": null,
    "createdAt": "2018-12-06T19:58:21.314Z",
    "updatedAt": "2018-12-06T19:58:21.314Z",
    "campusId": 3
    },
    {
    "id": 6,
    "firstName": "Barry",
    "lastName": "Huang",
    "email": "someemailgoeshere@yahoo.com",
    "imageUrl": "http://i.imgur.com/AItCxSs.jpg",
    "gpa": null,
    "createdAt": "2018-12-06T20:04:04.275Z",
    "updatedAt": "2018-12-06T20:04:04.275Z",
    "campusId": 1
    },
    {
    "id": 1,
    "firstName": "justin",
    "lastName": "mintzer",
    "email": "mintzer.justin@gmail.com",
    "imageUrl": "https://i.imgur.com/N9Koe2G.jpg",
    "gpa": 4,
    "createdAt": "2018-12-05T23:02:45.257Z",
    "updatedAt": "2018-12-05T23:02:45.257Z",
    "campusId": 1
    },
    {
    "id": 24,
    "firstName": "first",
    "lastName": "LAST",
    "email": "email@email.com",
    "imageUrl": "http://i.imgur.com/AItCxSs.jpg",
    "gpa": null,
    "createdAt": "2018-12-10T04:50:33.677Z",
    "updatedAt": "2018-12-10T04:50:33.677Z",
    "campusId": null
    },
    {
    "id": 2,
    "firstName": "bob",
    "lastName": "jones",
    "email": "bobbyboy1234@yahoo.com",
    "imageUrl": "https://i.imgur.com/GuAB8OE.jpg",
    "gpa": 3.7,
    "createdAt": "2018-12-05T23:02:45.270Z",
    "updatedAt": "2019-06-14T00:15:35.429Z",
    "campusId": 1
    }
    ]

students.get('/', (req, res, next) => {
    console.log('got request for hello world');
    res.status(200).send(studentsArray);
})

students.get('/:id', (req, res, next) => {
    const index = req.params.id;
    const result = studentsArray.find( student => student.id === parseInt(index));
    if(result) {
        res.status(200).send(result);
    } else {
        res.status(404).send('Not found');
    }
})

students.post('/', (req, res, next) => {
    const newStudent = req.query;
    if(newStudent) {
        studentsArray.push(newStudent);
        res.status(200).send(newStudent);
    } else {
        res.status(400).send("Bad Request");
    }
})

students.put('/:id', (req, res, next) => {
    
});

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