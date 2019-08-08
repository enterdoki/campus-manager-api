const express = require('express');
const campuses = express.Router();
const bodyParser = require('body-parser')
const db = require('../database/db')

campuses.use(bodyParser.json());

campuses.get('/', async(req, res, next) => {
    try {
        const data = await db.query("SELECT * FROM campuses");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(err);
    }
})

campuses.get('/:id', async(req, res, next) => {
    const campus_id = parseInt(req.params.id);
    try {
        const data = await db.query(`SELECT * FROM students WHERE id = ${campus_id}`)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(err);
    }
})

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

campuses.put('/:id', (req, res, next) => {
    const index = req.params.id;
    const result = campusesArray.find( campus => campus.id === parseInt(index));
    const updateCampus = req.query;
    if(result) {
        campusesArray[result] = updateCampus;
        res.status(200).send(updateCampus);
    } else {
        res.status(404).send("Campus not found!");
    }
});

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