const db = require('../config/db.config.js');

const Product = db.products;
const Upvote = db.Upvote;
const Category = db.Caterogy; 
// Fetch all products 
exports.findAll = (req, res) => {
  var { category, user_id } = req.query;
  
  Product.findAll({
    limit: 10,
    order: [
      ['upvoted', 'DESC']
    ],
    where: {
      category: category
    }
  }).then(products => {
    var promises = [];
    products.forEach(product => {
      var promise = Upvote.findOne({
        where: {
          product_id: product.id,
          user_id: user_id
        }
      });
      promises.push(promise);

    });
    console.log(promises.length);

    Promise.all(promises).then(results => {

      results.map((result, index) => {
        if (result === null) {
          products[index].upvoted = "0"
        } else {
          products[index].upvoted = "1"
        }
      })
      return res.status(200).send({
         products
      }).catch(err => {
        return res.status(400).send({
          success: false,
          message: "error ocured".err
        })
      })
    })

  }).catch(err => {
    console.log(err);

    res.status(400).send({
      success: false,
      "message": "Failed to provie data", 
      error:err 
    })
  })
}

// get category 

exports.findAllCategory = (req, res) => {
  Category.findAll().then((products)=>{
    res.status(200).send({
      products
    })
  }).catch(err=>{
      res.status(500).send({
        success:false,
        message : "internal server error", 
        error: err
      })
  })
}

// Create a product

exports.createProduct = (req, res)=>{
  console.log(req.body);
  
  var {itemName, category, image1, image2, image3, price, discount, upvoted} = req.body; 
  Product.create({
    itemName, category, image1, image2, image3, price, discount, upvoted
  }).then(product=>{
    if(!product){
      return res.status(500).send({
        success: false, 
        message:"unable to create resource"
      }); 
    }
    return res.status(200).send(product); 
  }).catch(err=>{
    res.status(500).send({
      success: false, 
      message: "Internal server error",
      error: err
    })
  })


}

// fetch all product by id 

// update a product 

// Delete a product