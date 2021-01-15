
//file upload endpoint(use axios from client request):
const handleUpload = (req,res,fileUpload) =>{ 
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
};

module.exports = {
 handleUpload: handleUpload
};