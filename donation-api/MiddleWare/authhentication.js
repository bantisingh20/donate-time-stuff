const dbService  = require('../DatabaseHelper/DatabaseHelper');
const jwt = require("jsonwebtoken");
 

const verifyuser = async(req,res,next) => {
    try {
        
        const authHeader = req.headers['authorization'];
 
        const token = authHeader && authHeader.split(' ')[1];
  
        if(!token || token === "null"){
            console.log("token is invalid")
            return res.status(401).json({success:false, message :"Token not provided"});
           
        }

        const decode = jwt.verify(token, "bantisingh")
        console.log('Decoded payload:', decode);  
        if(!decode){
            console.log("token is not valid");
            return res.status(401).json({success:false, message :"Token not valid"});
        }
 
  
        const user = await dbService.executeStoredProcedure('spGetEmployeeByID',{
            'id': decode.userId
        })
         
        if(!user){
            console.log("user not found");
            return res.status(401).json({success:false, message :"User Not Found"});
        }
        else{ 
            console.log(user);
            const userResponse = {
                _id : user[0].UserId,
                emailid: user[0].Email,
                role: user[0].RoleId,
                name: user[0].FullName
            };

            req.user= userResponse;
            
            next();
        }
         
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message :"Server Error"});
    }
    
}

const verify = async(req,res) =>{
    return res.status(200).json({ success:true, message: 'authenticate successfully' ,user :req.user });
}
module.exports = {
   verifyuser,verify
}