const Sequelize = require('sequelize');
const db = require('../db');

const Students = db.define("students", {
    firstname : {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname : {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
    },
    gpa: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps:false
});



module.exports = Students;