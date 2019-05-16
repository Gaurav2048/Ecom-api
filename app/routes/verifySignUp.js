const config = require('../config/config');
const db = require('../config/db.config');
const User = db.User;

checkDuplicateUserNameAndPassword = (req, res, next)  =>{
    // check for user name in database 

    User.findOne({
        where:{
            email: req.body.email
        }
    }).then((user)=>{
        if(user){
            res.status(400).send({
                success: false,
                message:"email already exists"
            })
        return; 
        }
        next(); 
    });

}

const verifySignUp = {};
verifySignUp.checkDuplicateUserNameAndPassword  = checkDuplicateUserNameAndPassword; 
module.exports = verifySignUp; 

