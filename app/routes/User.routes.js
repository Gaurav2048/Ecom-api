const verifySignUp = require('./verifySignUp'); 
const authJwt = require('./verifyJwtToken'); 


module.exports = function(app){
    const userController = require('../controller/userController.js');

    app.post('/api/auth/signup',verifySignUp.checkDuplicateUserNameAndPassword, userController.signup);

    app.post('/api/auth/signin', userController.signIn); 

     app.get('/api/auth/checkmiddle', authJwt.verifyToken, userController.signIn); 

}