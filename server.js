//need to install bodyParser,Cors and more
const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const fileUpload =  require('express-fileupload');
const cors = require('cors');


//import server endpoints functions from external modules:
const handleAddHobbies = require('./controllers/AddHobbies.js')
const handleChangeUserCity = require('./controllers/ChangeUserCity.js')
const handleChangeUserName = require('./controllers/ChangeUserName.js')
const handleDeleteUser = require('./controllers/DeleteUser.js')
const handleGetHobbies = require('./controllers/GetHobbies.js')
const handleGetUsers = require('./controllers/GetUsers.js')
const handleGetUsersData = require('./controllers/GetUsersData.js')
const handleLogin = require('./controllers/Login.js')
const handleRegister = require('./controllers/Register.js')



//connect the server to database:
const db = knex({
 client: 'pg',
 connection:{
  host: process.env.DATABASE_URL
   
 }
})

//express middlewares:
app.use(express.json())
// app.use(bodyParser.json())
app.use(fileUpload())
app.use(cors())
//use default folder called 'static' to access the files
app.use(express.static('public'));



//test root endpoint
app.get('/',(req,res)=>{
 res.json('home route')
});


//get users enpoint(return all users from database):
app.get('/getUsers',(req,res) =>{
 return handleGetUsers.handleGetUsers(req,res,db);   
});


//return users data to be compared and then by users id we add the
//users to final render list:
app.get('/getUsersData',(req,res) =>{
  return handleGetUsersData.handleGetUsersData(req,res,db);
});


//get user hobby endpoint:(return current user hobbies)
app.post('/getHobbies',(req,res) =>{
  return handleGetHobbies.handleGetHobbies(req,res,db);
})


//endpoint that delete user data(all data):
app.delete('/delete-user',(req,res) =>{
 return handleDeleteUser.handleDeleteUser(req,res,db);
})


//update user name at this endpoint
app.put('/change-user-name',(req,res) =>{
 return handleChangeUserName.handleChangeUserName(req,res,db);
})


//update user city at this endpoint
app.put('/change-user-city',(req,res) =>{
  return handleChangeUserCity.handleChangeUserCity(req,res,db); 
})
 

//add hobbies endpoint:
app.post('/addHobbies',(req,res) =>{
 return handleAddHobbies.handleAddHobbies(req,res,db);
})


//file upload endpoint(use axios from client request):
app.post('/upload',(req,res) =>{ 
  if(!req.files){
   return res.status(500).json({msg: 'there are not files yet'}); 
  }
  //file assigned to a variabile:
  const file = req.files.file; 
 
  //mv() method places the file inside public directory
  file.mv(`${__dirname}/public/${file.name}`,error =>{
   if(error){
    //print the error in case that exist: 
    console.error(error);
    //return an response from the server:
    return res.status(500).json({msg:'there are an server error'}) 
   }
   
   console.log('file path:\n',`/${file.name}`)
 
   //otherwise return file object:
   return res.json({
     fileName: file.name,
     filePath: `/${file.name}`
   });
  });
});


//register endpoint:
app.post('/register',(req,res) =>{
 return handleRegister.handleRegister(req,res,db,bcrypt);
});


//login endpoint:(en)
app.post('/login',(req,res) =>{
 return handleLogin.handleLogin(req,res,db,bcrypt);
});


//set the server port(default or automatic)
let port = process.env.PORT || 2020;

app.listen(port,() => {
 console.log('App is listening on port',port)
})