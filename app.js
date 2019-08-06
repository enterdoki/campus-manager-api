const express = require('express');
const students = require('./routes/students');
const campuses = require('./routes/campuses');
const app = express();

app.use('/students', students);
app.use('/campuses', campuses);

app.get('/', (req, res, next) => {
    console.log('got request for hello world');
    res.status(200).send('Hello World, default route!');
})

app.listen(3000, () => {
    console.log('Example app is listening on port 3000');
});