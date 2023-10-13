const AuthController = require("../controllers/Auth.controller");
const TaskController = require("../controllers/Task.Controller");
const UserController = require("../controllers/User.controller");
const checkLogin = require("../middleware/checkLogin");

const route = (app) => {
    // User
    app.post('/create-user', UserController.CreateUser);
    app.put('/update-user/:id', UserController.UpdateUser);
    app.delete('/delete-user/:id', UserController.DeleteUser);
    app.get('/find-user/:id', UserController.FindUserById);

    //auth
    app.post("/register",AuthController.register);
    app.post("/login",AuthController.login);
    app.get("/getUserInfo/",checkLogin,AuthController.getUserInfo);

    // Task

    app.post('/create-task',checkLogin, TaskController.CreateTask);
    app.put('/update-task/:id', TaskController.UpdateTask);
    app.delete('/delete-task/:id', TaskController.DeleteTask);
    app.get('/find-task/:id', TaskController.FindTaskById);
    // app.get('/find-tasks-by-user/:id', TaskController.FindAllTasksByUserId);
    app.get('/find-tasks-by-user',checkLogin, TaskController.FindAllTasksByUserId);
    
    app.use('/',UserController.Home);
}

module.exports = route;