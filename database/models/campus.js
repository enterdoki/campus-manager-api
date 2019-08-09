const Sequelize = require('sequelize');
const db = require('../db');

const Campuses = db.define("campuses", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type:Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps:false
});



module.exports = Campuses;