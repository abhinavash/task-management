// Load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}

//Import dependencies
const express = require('express');
const connectToDb = require('./config/connectToDb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const Task = require("./models/task");
const taskController  = require("./controllers/taskController");
const userController = require("./controllers/userController");
const requireAuth = require("./middleware/requireAuth");
//Create an express app
const app = express();


// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials:true,
}));

// Connect to database
connectToDb();


// Routing
app.get('/', (req,res) => {
    res.json({hello:"World"});
});


app.post('/signup', userController.signup);
app.post('/login',userController.login);
app.get('/logout',userController.logout);
app.get("/checkAuth", requireAuth, userController.checkAuth);

app.get('/getTasks',requireAuth, taskController.getTasks);
app.get('/getTask/:id',requireAuth, taskController.getTask);
app.post('/createTasks',requireAuth,taskController.createTask);
app.put('/updateTask/:id',requireAuth, taskController.updateTask); 
app.delete('/deleteTask/:id' , requireAuth,taskController.deleteTask )

app.listen(process.env.PORT);