
//update user name at this endpoint
const handleChangeUserName = (req,res,db) =>{
    db('users')
    .where('user_id',req.body.userId)
    .update({
     username: req.body.newName 
    })
    .then(() => console.log('updated with success'))
  
   res.json('change user data endpoint') 
}

module.exports = {
 handleChangeUserName: handleChangeUserName   
};