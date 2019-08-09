const Sequelize = require('sequelize');
const db = require('../db');

const Students = db.define("students", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
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
    },
    campusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "campuses",
            key: "id"
        }
    }
},{
    timestamps:false
});



module.exports = Students;