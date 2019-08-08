const express = require('express');
const campuses = express.Router();
const bodyParser = require('body-parser')
const db = require('../database/db')
campuses.use(bodyParser.json());

// Find all students from school
//SELECT * FROM campuses INNER JOIN students ON students.campusid = campuses.id ORDER BY campuses.name ASC

/*
Get /api/campuses gets all campuses
*/
campuses.get('/', async(req, res, next) => {
    try {
        const data = await db.query("SELECT * FROM campuses");
        res.status(200).json(data[0]);
    } catch (err) {
        res.status(400).send(err);
    }
})

/*
Get /api/campuses/:id gets campus with specific id
*/
campuses.get('/:id', async(req, res, next) => {
    const campus_id = parseInt(req.params.id);
    try {
        const data = await db.query(`SELECT * FROM campuses WHERE id = ${campus_id}`)
        if(Object.keys(data[0]).length !==0) {  // Found campus
            res.status(200).json(data[0]);
        } 
        if(Object.keys(data[0]).length===0) {   // Not found
            res.status(200).send("Campus not found, try again!");
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

/*
Get /api/campuses/:id/students gets all students from specified campus
*/
campuses.get('/:id/students', async(req, res, next) => {
    const campus_id = parseInt(req.params.id);
    try {
        const data = await db.query(`SELECT * FROM campuses LEFT JOIN students ON students.campusid = campuses.id WHERE campuses.id = ${campus_id}`);
        res.status(200).json(data[0]);
    } catch (err) {
        res.status(400).send(err);
    }
})

/*
POST /api/campuses Creates new campus
*/
campuses.post('/', async(req, res, next) => {
    const name = req.body.name
    const address = req.body.address
    const description = req.body.description
    const imgUrl = req.body.imgUrl
    try {
        if(!imgUrl) {   // No image
            await db.query(`INSERT INTO campuses 
                        VALUES (DEFAULT, '${name}', '${address}', '${description}')`)
        } 
        if(imgUrl) {    // Campus appended image link
            await db.query(`INSERT INTO campuses 
                            VALUES (DEFAULT, '${name}', '${address}', '${description}', '${imgUrl}')`)
        }
        console.log("Successfully added.")
        res.status(204).send("Success");
    } catch (err) {
        res.status(400).send(err);
    }
})

/*
PUT /api/campuses/:id updates campus
*/
campuses.put('/:id', async(req, res, next) => {
    const campus_id = parseInt(req.params.id);
    const name = req.body.name
    const address = req.body.address
    const description = req.body.description
    const imgUrl = req.body.imgUrl
    try {
        await db.query(`UPDATE campuses 
                        SET name = '${name}', address = '${address}' ,description = '${description}', image = '${imgUrl}'
                        WHERE id = ${campus_id}`)
        res.status(200).send("Successfully updated!");
    } catch (err) {
        res.status(400).send(err);
    }
});

/*
Delete /api/campuses/:id Deletes campus with specific id
*/
campuses.delete('/:id', async(req, res, next) => {
    const campus_id = parseInt(req.params.id);
    try {
        await db.query(`DELETE FROM campuses WHERE id = ${campus_id}`)
        res.status(200).send("Successfully deleted!");
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = campuses;