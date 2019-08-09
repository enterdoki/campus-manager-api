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
    try{
        const campus = await Campus.findAll()
        res.status(200).send(campus);
    }
    catch(err){
        console.log(err);
    }
})

/*
Get /api/campuses/:id gets campus with specific id
*/
campuses.get('/:id', async(req, res, next) => {
    try{
        const campus = await Campus.findAll({where:{id: parseInt(req.params.id)}})
        res.status(200).send(campus);
    }
    catch(err){
        console.log(err);
    }
})

/*
Get /api/campuses/:id/students gets all students from specified campus
*/
campuses.get('/:id/students', async(req, res, next) => {
    try{
        const campus = await Campus.findAll({ include: [Student] })
        res.status(200).send(campus);
    }
    catch(err){
        console.log(err);
    }
})

/*
POST /api/campuses Creates new campus
*/
campuses.post('/', async(req, res, next) => {
    try{
        const campus = await Campus.create(req.body)
        console.log(campus)
        res.status(200).json(campus);
    }
    catch(err){
        console.log(err);
    }
})

/*
PUT /api/campuses/:id updates campus
*/
campuses.put('/:id', async(req, res, next) => {
    try{
        const campus = await Campus.update(req.body,{where: {id: parseInt(req.params.id)}})
        console.log(campus);
        res.status(200).send(campus);
    }catch(err){
        console.log(err);
    }
});

/*
Delete /api/campuses/:id Deletes campus with specific id
*/
campuses.delete('/:id', async(req, res, next) => {
    try{
        await Campus.destroy({where: {id:parseInt(req.params.id) }})
        res.status(200).send("Successfully deleted!");
    }catch(err){
        console.log(err);
    }
})

module.exports = campuses;
