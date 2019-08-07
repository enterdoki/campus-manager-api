const express = require('express');
const students = require('./routes/students');
const campuses = require('./routes/campuses');
const app = express();

app.use('/api/students', students);
app.use('/api/campuses', campuses);

var port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    console.log('got request for hello world');
    res.status(200).send('Hello World, default route!');
})

app.listen(port, () => {
    console.log('Example app is listening on port 3000');
});