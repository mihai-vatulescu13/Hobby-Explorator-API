
//this method assign an array of hobby for each user:
//O(n) time complexity:
const handleUsersHobbies = (userArr) =>{
 //the final array of hobbies: 
 let hobbies = []; 
 let cache = {}

 for(let i=0;i<userArr.length;i++){
  if(userArr[i].user_id in cache){
    continue; 
  }else{
    cache[userArr[i].user_id] = userArr[i].user_id 
  } 
 } 

 for(let item in cache){
 // console.log(item)
  let tempObj = {
   user_id: 0,
   userArrHobby: [] 
  };

  let temp = [];

  for(let i=0;i<userArr.length;i++){
   if(userArr[i].user_id === cache[item]){
    temp.push(userArr[i].hobby)
   }
  }
    
  //update tempObj properties:
  tempObj.user_id = cache[item];
  tempObj.userArrHobby = temp;
  hobbies.push(tempObj);  
 }

 return hobbies
}
   
   
//return users data to be compared and then by users id we add the
//users to final render list:
const handleGetUsersData = (req,res,db) =>{
    db.from('users')
    .innerJoin('hobbies','users.user_id','hobbies.hobby_id')
    .select('user_id','username','hobby','city')//return hobby column
    .orderBy('users.user_id')
    .then(data =>{
        //users array of hobbies:
        const userHobbies = handleUsersHobbies(data);
        
        //to be continued:
        return res.json({
        //usersData: data,
        usersHobbies: userHobbies 
        })
    
    })
    .catch(err =>{
        return res.status(400).json(err);  
    })
}

module.exports = {
  handleGetUsersData: handleGetUsersData  
};