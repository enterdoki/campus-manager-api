const campuses = require('express').Router();
const { Campus, Student } = require("../database/models");
const bodyParser = require('body-parser')
campuses.use(bodyParser.json());

// Find all students from school
//SELECT * FROM campuses INNER JOIN students ON students.campusid = campuses.id ORDER BY campuses.name ASC

/*
Get /api/campuses gets all campuses
*/
campuses.get('/', async(req, res, next) => {
    try {
        const campuses = await Campus.findAll();
        if(campus) {
            res.status(200).json(campuses);
        }
    } catch (err) {
        next(err);
    }
})

/*
Get /api/campuses/:id gets campus with specific id
*/
campuses.get('/:id', async(req, res, next) => {
    try {
        const campus = await Campus.findOne({
            where: {id : req.params.id}
        });
        if(campus) {
            res.status(200).json(campus);
        }
    } catch (err) {
        next(err);
    }
})

/*
Get /api/campuses/:id/students gets all students from specified campus
*/
campuses.get('/:id/students', async(req, res, next) => {
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
POST /api/campuses Creates new campus
*/
campuses.post('/', async(req, res, next) => {
    try {
       let new_campus = await Campus.create(req.body);
       res.status(201).json(new_campus);    
    } catch (err) {
        next(err)
    }
})

/*
PUT /api/campuses/:id updates campus
*/
campuses.put('/:id', async(req, res, next) => {
    try {
        await Campus.update(req.body, {
            where: {id:req.params.id},
            returning: true,
            plain: true,
        })
        res.status(200).send("Successfully updated!");
    } catch (err) {
        next(errr);
    }
});

/*
Delete /api/campuses/:id Deletes campus with specific id
*/
campuses.delete('/:id', async(req, res, next) => {
    try {
        const deleteOne = await Campus.destroy({
            where: {id : req.params.id}
        });
        if(deleteOne) {
            res.status(200).send("Successfully deleted!");
        }
    } catch (err) {
        next(err);
    }
})

module.exports = campuses;
