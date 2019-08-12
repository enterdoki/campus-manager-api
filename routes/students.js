const express = require('express');
const bodyParser = require('body-parser')
const students = express.Router();
students.use(bodyParser.json());
const { Campus, Student } = require("../database/models");
const db = require('../database/db')

/*
GET /api/students gets all students
*/
students.get('/', async(req, res, next) => {
    //{attributes:["id", "firstname", "lastname", "email", "image", "gpa", "campusid"]}
    try {
        const students = await Student.findAll({attributes:{exclude:["campusId"]}});
        if(students) {
            res.status(200).json(students);
        } else {
            res.status(400).send("Not found");
        }
    } catch (err) {
        next(err);
    }
})
/*
GET /api/students/:id gets student with specific id
*/
students.get('/:id', async(req, res, next) => {
    try {
        const student = await Student.findOne({
            where: {id : req.params.id},
            attributes:{exclude:["campusId"]}
            
        });
        if(student) {
            res.status(200).json(student);
        } else {
            res.status(400).send("Not found");
        }
    } catch (err) {
        next(err);
    }
})

/*
Get /api/students/:id/campus gets a specific student's campus information
*/
students.get('/:id/campus', async(req, res, next) => {
    try {
        let campus = await Student.findOne({
            where: { id: req.params.id }, include: [{ model: Campus }]
        })
        res.status(200).json(campus)
    } catch (error) {
        console.log(error)
    }
    // const campus_student = await Student.findOne({
    //     where: {id : req.params.id}
    // })
    // try {
    //     const students_of_campus = await campus_student.getCampuses();
    //     res.status(200).json(students_of_campus);
    // } catch(err) {
    //     next(err);
    // }
})

/*
POST /api/students Creates new student
*/
students.post('/', async(req, res, next) => {
    try {
        let new_student = await Student.create(req.body);
        res.status(201).json(new_student);    
     } catch (err) {
         next(err)
     }
});

/*
PUT /api/students/:id updates student
*/
students.put('/:id', async(req, res, next) => {
    try {
        await Student.update(req.body, {
            where: {id:req.params.id},
            returning: true,
            plain: true,
        })
        res.status(200).send("Successfully updated!");
    } catch (err) {
        next(err);
    }
});

/*
DELETE /api/students/:id Deletes student with specific id
*/
students.delete('/:id', async(req, res, next) => {
    try {
        const deleteOne = await Student.destroy({
            where: {id : req.params.id}
        });
        if(deleteOne) {
            res.status(200).send("Successfully deleted!");
        }
    } catch (err) {
        next(err);
    }
})

module.exports = students;
