const express = require('express');
const students = require('./routes/students');
const campuses = require('./routes/campuses');

const app = express();

app.use('/api/students', students);
app.use('/api/campuses', campuses);


var port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.status(200).send('Hi, this is the default API route!');
})

app.listen(port, () => {
    console.log('Server is listening on http://localhost:' + port);
});