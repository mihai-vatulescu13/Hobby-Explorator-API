
//login endpoint:(en)
const handleLogin = (req,res,db,bcrypt) =>{
    const {email, password} = req.body;
    //first select email and password from database:
    return db.select('email','password')
      .from('login')
      .where('email',email)
      .then(givenUser =>{
       const validPass = bcrypt.compareSync(password,givenUser[0].password)
       if(validPass){
         //return user data if his credentials are correct:
         return db.select('*')
          .from('users')
          .where('email',email)
          .then(data =>{
           //send the user data to the client:   
           return res.json(data[0])
          })
          .catch(err => res.status(400).json('cannot get user'))   
       }
      })
      .catch((err) => res.json('wrong credentials'))
};

module.exports = {
  handleLogin: handleLogin  
};