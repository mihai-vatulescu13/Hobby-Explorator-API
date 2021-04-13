
//register endpoint:
const handleRegister = (req,res,db,bcrypt) =>{
    const {userName, email, password, city, imageprofile} = req.body;
    //hash(encrypt) user password:
    const hashedPass = bcrypt.hashSync(password);
    //test data from the client:
    console.log(userName,email,city);
    db.transaction(transact =>{ 
     //use transact object instead of db for database operations
     transact.insert({
      password: hashedPass,
      email: email   
     })
     .into('login')
     .returning('email')//return email column
     .then(user_email =>{
      //the email from login table will be placed in user table   
      return transact('users')
       .returning('*')//inserts user and return all the columns
       .insert({
         username: userName,
         email: user_email[0],
         city: city,
         joined: new Date(),
         imageprofile: imageprofile
         //add here image profile string field  
       })
       .then((data) =>{
         res.json(data[0]); 
       })
     })
     .then(transact.commit)//"finalize" the operation
     .catch(transact.rollback)//reexecute if database fail
    })
    .catch(() => res.status(400).json('register error'))
   
};

module.exports = {
 handleRegister: handleRegister   
};