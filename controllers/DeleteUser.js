
//endpoint that delete user data(all data):
const handleDeleteUser = (req,res,db) =>{
    //destructure given data from client:
    const {givenUserEmail, givenUserId} = req.body;
  
    //delete user from database by user id and email:
    db.delete().from('hobbies').where('hobby_id',givenUserId)
      .then(() => console.log('hobbies deleted with success!'))
      .catch(err => console.log(err));
  
    db.delete().from('users').where('email',givenUserEmail)
      .then(() => console.log('user deleted with success!'))
      .catch(err => console.log(err));
    
    db.delete().from('login').where('email',givenUserEmail)
      .then(() => console.log('login deleted with success!'))
      .catch(err => console.log(err));
  
    res.json(`user ${givenUserEmail} was deleted with success`);
  
}

module.exports = {
  handleDeleteUser: handleDeleteUser  
};