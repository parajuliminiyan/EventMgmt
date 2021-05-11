// const emplyeeController = require('../controllers').employee;
// const emplyeerController = require('../controllers').employeer;
const usersController = require('../controllers').users;
const jobsController = require('../controllers').jobs;


module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message:'Hello from User API'
    }));


    app.post('/api/signup', usersController.create);
    app.post('/api/login', usersController.login);
    app.post('/api/profile/:id/edit', usersController.updateProfile);
    app.post('/api/jobs/create',jobsController.create);
    app.post('/api/jobs',jobsController.employeerjoblist);
    app.post('/api/jobs/all',jobsController.listAll);
    app.post('/api/jobs/users',jobsController.usersJobList);
    app.post('/api/users',usersController.listUser);
    app.post('/api/getuserdetails',usersController.getdetails)
    app.post('/api/notifications',usersController.getNotifications);
    app.post('/api/notifications/create',usersController.createNotifications);
    app.post('/api/notifications/update',usersController.updateNotifications);
    
    // app.post('/api/employeer/login', emplyeerController.login);
    // app.post('/api/employeer/signup', emplyeerController.create);
}