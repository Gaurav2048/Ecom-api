module.exports = function(app){

    var productController = require('../controller/product.controller');

    app.get('/api/products', productController.findAll); 

    app.get('/api/categories', productController.findAllCategory); 

    app.post('/api/product', productController.createProduct); 

    app.post('/api/category', productController.createCategory); 
    
    
    app.get('/api/get_popular_products', productController.propuar_products); 

  
  
    app.get('/api/new_products', productController.find_new_products); 

    app.get('/api/new_popular_products', productController.new_popular_products); 

    app.get('/api/new_exclusive_products', productController.new_exclusive_products); 

    app.get('/api/new_onsale_products', productController.new_onsale_products); 


    // serch routes 
    app.get('/api/suggestions', productController.searchByPhrase); 


}