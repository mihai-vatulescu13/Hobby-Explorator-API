
//add hobbies endpoint function:
const handleAddHobbies = (req,res,db) =>{
    const {selectedHobbies, user_id} = req.body
   
    for(let i=0;i<selectedHobbies.length;i++){
     //console.log('item,',selectedHobbies[i])
     db('hobbies').insert({
      hobby: selectedHobbies[i],
      hobby_id: user_id  
     })
     .then(() => console.log('success')) 
    }
    
    //return a response to client:
    return res.json('data received with success');
}

module.exports = {
  handleAddHobbies: handleAddHobbies  
};