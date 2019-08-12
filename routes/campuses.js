const campuses = require('express').Router();
const { Campus, Student } = require("../database/models");
const bodyParser = require('body-parser')
campuses.use(bodyParser.json());
const db = require('../database/db')


// Find all students from school
//SELECT * FROM campuses INNER JOIN students ON students.campusid = campuses.id ORDER BY campuses.name ASC

/*
Get /api/campuses gets all campuses
*/
campuses.get('/', async (req, res, next) => {
    try {
        const campus = await Campus.findAll()
        res.status(200).json(campus);
    }
    catch (err) {
        console.log(err);
    }
})

/*
Get /api/campuses/:id gets campus with specific id
*/
campuses.get('/:id', async (req, res, next) => {
    try {
        const campus = await Campus.findAll({ where: { id: parseInt(req.params.id) } })
        res.status(200).json(campus);
    }
    catch (err) {
        console.log(err);
    }
})

/*
Get /api/campuses/:id/students gets all students from specified campus
*/
campuses.get('/:id/students', async (req, res, next) => {
<<<<<<< HEAD
    const campus_id = parseInt(req.params.id);
=======
>>>>>>> d4c7cb71a9cc984b7cd729e99838dcdbc42b6fbc
    try {
        let campuses = await Campus.findOne({
            where: { id: req.params.id }, include: [{ model: Student }]
        })
        res.status(200).json(campuses)
    } catch (error) {
        console.log(error)
    }
    // const campus_student = await Campus.findOne({
    //     where: {id : req.params.id}
    // })
    // try {
    //     const students_of_campus = await campus_student.getStudents();
    //     res.status(200).json(students_of_campus);
    // } catch(err) {
    //     next(err);
    // }
})

/*
POST /api/campuses Creates new campus
*/
campuses.post('/', async (req, res, next) => {
    try {
        const campus = await Campus.create(req.body)
        console.log(campus)
        res.status(200).json(campus);
    }
    catch (err) {
        console.log(err);
    }
})

/*
PUT /api/campuses/:id updates campus
*/
campuses.put('/:id', async (req, res, next) => {
    try {
        let campus = await Campus.update(req.body, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })
        res.status(200).json(campus[1]);
    } catch (err) {
        next(err);
    }
});

/*
Delete /api/campuses/:id Deletes campus with specific id
*/
campuses.delete('/:id', async (req, res, next) => {
    try {
        await Campus.destroy({ where: { id: parseInt(req.params.id) } })
        res.status(200).send("Successfully deleted!");
    } catch (err) {
        console.log(err);
    }
})

module.exports = campuses;
