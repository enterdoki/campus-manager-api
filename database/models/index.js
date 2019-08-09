const Campus = require("./campus");
const Student = require("./student");

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  Campus,
  Student
}