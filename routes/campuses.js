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
    // const result = campusesArray.find( campus => campus.id === parseInt(index));
    // if(result) {
    //     res.status(200).send(result);
    // } else {
    //     res.status(404).send('Not found');
    // }
})

campuses.post('/', (req, res, next) => {
    const newCampus = req.query;
    if(newCampus) {
        campusesArray.push(newCampus);
        res.status(200).send(newCampus);
    } else {
        res.status(400).send("Bad Request");
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

campuses.delete('/:id', (req, res, next) => {
    const index = req.params.id;
    const deleteCampus = campusesArray.find( campus => campus.id == parseInt(index));
    if(deleteCampus) {
        campusesArray.splice(deleteCampus,1);
        res.status(200).send("Student deleted!");
    } else {
        res.status(400).send("Bad Request");
    }
})


module.exports = campuses;