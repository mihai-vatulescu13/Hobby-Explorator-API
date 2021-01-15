
//get users enpoint(return all users from database):
const handleGetUsers = (req,res,db) =>{
    return db.select('*')
          .from('users')
          .then(data =>{
            return res.json(data);//create an endpoint that returns an boject that contain user data and his hobbies as properties:  
          })
          .catch(err =>{
            return res.status(404).json(err);  
          })
             
}

module.exports = {
  handleGetUsers: handleGetUsers  
};