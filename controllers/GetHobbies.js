
//get user hobby endpoint:(return current user hobbies)
const handleGetHobbies = (req,res,db) =>{
    const {user_id} = req.body;
    return db.select('hobby')
             .from('hobbies')
             .where('hobby_id',user_id)
             .then(data =>{
              return res.json(data); 
             })
             .catch(err =>{
              return res.status(400).json(err); 
             })  
}
 
module.exports = {
  handleGetHobbies: handleGetHobbies  
};