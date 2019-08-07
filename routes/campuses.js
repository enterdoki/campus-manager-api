const express = require('express');
const campuses = express.Router();
const bodyParser = require('body-parser')

campuses.use(bodyParser.json());

const campusesArray = [
    {
    "id": 1,
    "name": "FullStack Academy",
    "imgUrl": "https://www.fullstackacademy.com/images/fa-logo.png",
    "address": "5 Hanover Sq",
    "description": "Fullstack Academy is an immersive software engineering coding bootcamp located in New York City and Chicago. Students of the full-time flagship course learn full stack JavaScript over the course of a 13-week, on-campus program.",
    "createdAt": "2018-12-05T23:02:45.290Z",
    "updatedAt": "2018-12-05T23:02:45.290Z"
    },
    {
    "id": 2,
    "name": "Nassau Community College",
    "imgUrl": "https://nccapps.ncc.edu/forms/ComplaintForm/logo.png",
    "address": " 1 Education Dr, Garden City, NY 11530",
    "description": "Nassau Community College is a two-year college located in East Garden City, New York, USA. The school is in Nassau County on Long Island. NCC maintains a nationwide reputation for ease of transferability to four-year institutions.",
    "createdAt": "2018-12-05T23:02:45.299Z",
    "updatedAt": "2018-12-05T23:02:45.299Z"
    },
    {
    "id": 5,
    "name": "Harvard",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/en/0/02/Harvard_shield-College.png",
    "address": "86 Brattle Street Cambridge, MA 02138",
    "description": "Harvard College is the undergraduate liberal arts college of Harvard University. Founded in 1636 in Cambridge, Massachusetts, it is the oldest institution of higher learning in the United States and one of the most prestigious in the world.",
    "createdAt": "2018-12-06T17:39:33.705Z",
    "updatedAt": "2018-12-06T17:39:33.705Z"
    },
    {
    "id": 3,
    "name": "Brown University",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Brown_University_coat_of_arms.svg/130px-Brown_University_coat_of_arms.svg.png",
    "address": "Providence, RI 02912",
    "description": "Brown University is a private Ivy League research university in Providence, Rhode Island. Founded in 1764 as the College in the English Colony of Rhode Island and Providence Plantations, it is the seventh-oldest institution of higher education in the U.S. and one of the nine colonial colleges chartered before the American Revolution.",
    "createdAt": "2018-12-05T23:02:45.306Z",
    "updatedAt": "2018-12-05T23:02:45.306Z"
    }
    ]


/*
GET /api/campuses/:id gets all campuses
*/
campuses.get('/', (req, res, next) => {
    console.log('got request for hello world');
    res.status(200).send(campusesArray);
})

/*
GET /api/campuses/:id gets campus with specific id
*/
campuses.get('/:id', (req, res, next) => {
    const index = req.params.id;
    const result = campusesArray.find( campus => campus.id === parseInt(index));
    if(result) {
        res.status(200).send(result);
    } else {
        res.status(404).send("Campus not found!");
    }
})


/*
POST /api/campuses appends new campus
*/
campuses.post('/', (req, res, next) => {
    const newCampus = req.body;
    if(newCampus) {
        campusesArray.push(newCampus);
        res.status(200).send(newCampus);
    } else {
        res.status(400).send("Bad Request");
    }
})

/*
PUT /api/campuses/:id updates campus with specific id
------
Temp fix -> deleting position and inserting new value
*/
campuses.put('/:id', (req, res, next) => {
    const index = req.params.id;
    const result = campusesArray.find( campus => campus.id === parseInt(index));
    const updateCampus = req.body;
    if(result) {
        campusesArray.splice(result,1,updateCampus);
        res.status(200).send(campusesArray);
    } else {
        res.status(404).send("Campus not found!");
    }
});

/*
DELETE /api/campuses/:id Deletes campus with specific id
*/
campuses.delete('/:id', (req, res, next) => {
    const index = req.params.id;
    const deleteCampus = campusesArray.find( campus => campus.id == parseInt(index));
    if(deleteCampus) {
        campusesArray.splice(deleteCampus,1);
        res.status(200).send("Campus deleted!");
    } else {
        res.status(400).send("Bad Request");
    }
})


module.exports = campuses;