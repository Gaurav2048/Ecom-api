module.exports = function(app){

    const authJwt = require('../routes/verifyJwtToken');
    var orderController = require('../controller/Order.controller');

    app.post('/api/placeOrder',authJwt.verifyToken,orderController.addToCart ); 

    app.get('/api/orders',authJwt.verifyToken,orderController.orderHistory ); 


}