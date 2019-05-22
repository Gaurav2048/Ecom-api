const verifySignUp = require('./verifySignUp'); 
const verifyJtToken = require('./verifyJwtToken'); 


module.exports = function(app){
    const userController = require('../controller/userController.js');

    app.post('/api/auth/signup',verifySignUp.checkDuplicateUserNameAndPassword, userController.signup);

    app.post('/api/auth/signin', userController.signIn); 

    app.post('/api/auth/checkmiddleware', verifyJtToken.verifyToken, userController.verifyToken); 

}