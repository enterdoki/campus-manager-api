const campuses = require('express').Router();
const { Campus, Student } = require("../database/models");


// Find all students from school
//SELECT * FROM campuses INNER JOIN students ON students.campusid = campuses.id ORDER BY campuses.name ASC

/*
Get /api/campuses gets all campuses
*/
campuses.get('/', (req, res, next) => {
    Campus.findAll()
    .then(campus => res.status(200).json(campus))
    .catch(err => next(err));
})

/*
Get /api/campuses/:id gets campus with specific id
*/
campuses.get('/:id', async(req, res, next) => {
    Campus.findAll({where:{id: parseInt(req.params.id)}})
    .then(campus => res.status(200).json(campus))
    .catch(err=> next(err));
})

/*
Get /api/campuses/:id/students gets all students from specified campus
*/
campuses.get('/:id/students', async(req, res, next) => {
    Campus.findAll({ include: [Student] })
    .then(campuses => res.status(200).json(campuses))
    .catch(err => next(err));
})

/*
POST /api/campuses Creates new campus
*/
campuses.post('/', async(req, res, next) => {
    const name = req.body.name
    const address = req.body.address
    const description = req.body.description
    const imgUrl = req.body.image
    try {
        if(!imgUrl) {   // No image
            await db.query(`INSERT INTO campuses 
                        VALUES (DEFAULT, '${name}', '${address}', '${description}')`)
        } 
        if(imgUrl) {    // Campus appended image link
            await db.query(`INSERT INTO campuses 
                            VALUES (DEFAULT, '${name}', '${address}', '${description}', '${imgUrl}')`) 
                            
            const data = await db.query(`SELECT * FROM campuses WHERE id = SCOPE_IDENTITY()`)
            console.log("Successfully added.")
            res.status(200).send(data);
        }
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
    const imgUrl = req.body.image
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
