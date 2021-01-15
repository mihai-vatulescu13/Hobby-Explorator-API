
//update user city at this endpoint
const handleChangeUserCity = (req,res,db) =>{
    db('users')
    .where('user_id',req.body.userId)
    .update({
     city: req.body.newCity 
    })
    .then(() => console.log('updated with success'))
    res.json('change user data endpoint') 
}

module.exports ={
  handleChangeUserCity: handleChangeUserCity  
};