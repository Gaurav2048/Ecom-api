const verifySignUp = require('./verifySignUp'); 
//const authJwt = require('./authJwt'); 


module.exports = function(app){
    const userController = require('../controller/userController.js');

    app.post('/api/auth/signup',verifySignUp.checkDuplicateUserNameAndPassword, userController.signup);

    app.post('/api/auth/signin', userController.signIn); 

}