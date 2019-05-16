module.exports = function(app){

    var productController = require('../controller/product.controller');

    app.get('/api/products', productController.findAll); 

    app.get('/api/categories', productController.findAllCategory); 

}