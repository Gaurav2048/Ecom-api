module.exports = function(app){

    var productController = require('../controller/product.controller');

    app.get('/api/products', productController.findAll); 

    app.get('/api/categories', productController.findAllCategory); 

    app.post('/api/product', productController.createProduct); 

    app.post('/api/category', productController.createCategory); 
    
    
    app.get('/api/get_popular_products', productController.propuar_products); 

}