const { use } = require('../..');
// const user = require('./userController');
const employee = require('./employeeController');
const employeer = require('./employeerController');
const users = require('./userController');
const jobs = require('./jobsController');
module.exports = {
    employee,
    employeer,
    users,
    jobs

};