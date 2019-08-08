const express = require('express');
const bodyParser = require('body-parser')
const students = express.Router();
students.use(bodyParser.json());
const db = require('../database/db')

/*
GET /api/students gets all students
*/
students.get('/', async(req, res, next) => {
    try {
        const data = await db.query("SELECT * FROM students" );
        res.status(200).json(data[0]);
    } catch (err) {
        res.status(400).send(err);
    }
})
/*
GET /api/students/:id gets student with specific id
*/
students.get('/:id', async(req, res, next) => {
    const student_id = parseInt(req.params.id);
    try {
        const data = await db.query(`SELECT * FROM students WHERE id = ${student_id}`)
        if(Object.keys(data[0]).length !==0) {  // Found student
            res.status(200).json(data[0]);
        } 
        if(Object.keys(data[0]).length===0) {   // Not found
            res.status(200).send("Student not found, try again!");
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

/*
Get /api/students/:id/campus gets a specific student's campus information
*/
students.get('/:id/campus', async(req, res, next) => {
    const student_id = parseInt(req.params.id);
    try {
        const data = await db.query(`SELECT * FROM students LEFT JOIN campuses ON students.campusId =                                      campuses.id WHERE students.id = ${student_id}`);
        res.status(200).json(data[0]);
    } catch (err) {
        res.status(400).send(err);
    }
})

/*
POST /api/students Creates new student
*/
students.post('/', async(req, res, next) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const gpa = req.body.gpa
    const campusId = req.body.campusId
    const imgUrl = req.body.imgUrl
    
    try {
        if(!imgUrl) {   // No image
            await db.query(`INSERT INTO students 
                        VALUES (DEFAULT, '${firstName}', '${lastName}', '${email}', ${gpa}, ${campusId})`)
        } 
        if(imgUrl) {    // User appended image link
            await db.query(`INSERT INTO students 
                            VALUES (DEFAULT, '${firstName}', '${lastName}', '${email}', ${gpa}, ${campusId}, '${imgUrl}')`)
        }
        console.log("Successfully added.")
        res.status(204).send("Success");
    } catch (err) {
        res.status(400).send(err);
    }
});

/*
PUT /api/students/:id updates student
*/
students.put('/:id', async(req, res, next) => {
    const student_id = parseInt(req.params.id);
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const gpa = req.body.gpa
    const campusId = req.body.campusId
    const imgUrl = req.body.imgUrl
    try {
        await db.query(`UPDATE students 
                        SET firstname = '${firstName}', lastname = '${lastName}' ,email = '${email}',gpa = ${gpa}, campusId = ${campusId}, image = '${imgUrl}'
                        WHERE id = ${student_id}`)
        res.status(200).send("Successfully updated!");
    } catch (err) {
        res.status(400).send(err);
    }
});

/*
DELETE /api/students/:id Deletes student with specific id
*/
students.delete('/:id', async(req, res, next) => {
    const student_id = parseInt(req.params.id);
    try {
        await db.query(`DELETE FROM students WHERE id = ${student_id}`)
        res.status(200).send("Successfully deleted!");
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = students;
