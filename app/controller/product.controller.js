const db = require('../config/db.config.js');
const { Op } = require('sequelize')


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
      error: err
    })
  })
}

// get category 

exports.findAllCategory = (req, res) => {
  Category.findAll().then((products) => {
    res.status(200).send({
      products
    })
  }).catch(err => {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error: err
    })
  })
}

// Create a product

exports.createProduct = (req, res) => {
  console.log(req.body);

  var { itemName, category, description,  image1, image2, image3, price, discount, upvoted } = req.body;
  Product.create({
    itemName, category,description,  image1, image2, image3, price, discount, upvoted
  }).then(product => {
    if (!product) {
      return res.status(500).send({
        success: false,
        message: "unable to create resource"
      });
    }
    return res.status(200).send(product);
  }).catch(err => {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err
    })
  })


}

// create a product 
exports.createCategory = (req, res) => {
  console.log(req.body);

  var { categoryName, image } = req.body;
  Category.create({
    categoryName, image
  }).then(category => {
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "unable to create resource"
      });
    }
    return res.status(200).send(category);
  }).catch(err => {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err
    })
  })


}

// create an upvote 

exports.createUpVote = (req, res) => {
  var { user_id, product_id } = req.body;

  Upvote.findOne({
    where: {
      product_id,
      user_id
    }
  }).then(upvote => {
    if (upvote) {
      return res.status(200).send({
        success: false,
        message: "upvote found"
      });
    }

    Upvote.create({
      product_id, user_id
    }).then(upvote => {
      if (upvote) {
        return res.status(200).send({
          success: true,
          message: "Upvote added"
        });
      }

    })

  })

}

// fetch most liked products 
exports.propuar_products = (req, res) => {
  var { user_id } = req.query;
  Product.findAll({
    limit: 10,
    order: [
      ['upvoted', 'DESC']
    ]
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
    })

    Promise.all(promises).then(results => {
      results.map((result, index) => {
        if (result === null) {
          products[index].isupvoted = "0"
        } else {
          products[index].isupvoted = "1";
        }
      })
      res.status(200).send({
        products: products
      });
    }).catch(err => {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: err
      })
    })



  }).catch(err => {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err
    })
  })
}

// get new Products 

// on route new_products 
exports.find_new_products = (req, res) => {
  var { id, user_id } = req.query;
  Product.findAll({
    where: {
      id: {
        [Op.gt]: id
      }
    },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: 10
  }).then(products => {
    var promises = [];
      products.forEach(product=>{
        var promise = Upvote.findOne({
          user_id: user_id, 
          product_id: product.id
        }); 
        promises.push(promise); 
      })

      Promise.all(promises).then(results=>{
        results.map((result, index)=>{
          if(result === null){
            products[index].isupvoted="0"
          }else{
            products[index].isupvoted ="1"
          }
        })
        res.status(200).send({
          products: products
        })
      }).catch(err=>{
        res.status(500).send({
          success: false,
          message:"Internal server error", 
          error: err
        })
      })

  }).catch(err=>{
    res.status(500).send({
      success: false,
      message:"Internal server error", 
      error: err
    })
  })
}



//get new_popular_products


exports.new_popular_products = (req, res) => {
  var { id, user_id } = req.query;
  Product.findAll({
    where: {
      id: {
        [Op.gt]: id
      }
    },
    order: [
      ['createdAt', 'DESC'],
      ['upvoted','DESC']
    ],
    limit: 10
  }).then(products => {
    var promises = [];
      products.forEach(product=>{
        var promise = Upvote.findOne({
          user_id: user_id, 
          product_id: product.id
        }); 
        promises.push(promise); 
      })

      Promise.all(promises).then(results=>{
        results.map((result, index)=>{
          if(result === null){
            products[index].isupvoted="0"
          }else{
            products[index].isupvoted="1"
          }
        })
        res.status(200).send({
          products: products
        })
      }).catch(err=>{
        res.status(500).send({
          success: false,
          message:"Internal server error", 
          error: err
        })
      })

  }).catch(err=>{
    res.status(500).send({
      success: false,
      message:"Internal server error", 
      error: err
    })
  })
}



// get new_exclusive_products 

exports.new_exclusive_products = (req, res) => {
  var { id, user_id } = req.query;
  Product.findAll({
    where: {
      id: {
        [Op.gt]: id
      }
    },
    order: [
      ['price', 'DESC'],
      ['createdAt', 'DESC']
    ],
    limit: 10
  }).then(products => {
    var promises = [];
      products.forEach(product=>{
        var promise = Upvote.findOne({
          user_id: user_id, 
          product_id: product.id
        }); 
        promises.push(promise); 
      })

      Promise.all(promises).then(results=>{
        results.map((result, index)=>{
          if(result === null){
            products[index].isupvoted="0"
          }else{
            products[index].isupvoted ="1"
          }
        })
        res.status(200).send({
          products: products
        })
      }).catch(err=>{
        res.status(500).send({
          success: false,
          message:"Internal server error", 
          error: err
        })
      })

  }).catch(err=>{
    res.status(500).send({
      success: false,
      message:"Internal server error", 
      error: err
    })
  })
}



// get new_onsale_products 


exports.new_onsale_products = (req, res) => {
  var { id, user_id } = req.query;
  Product.findAll({
    where: {
      id: {
        [Op.gt]: id
      }
    },
    order: [
      ['discount', 'DESC'], 
      ['createdAt', 'DESC']
    ],
    limit: 10
  }).then(products => {
    var promises = [];
      products.forEach(product=>{
        var promise = Upvote.findOne({
          user_id: user_id, 
          product_id: product.id
        }); 
        promises.push(promise); 
      })

      Promise.all(promises).then(results=>{
        results.map((result, index)=>{
          if(result === null){
            products[index].isupvoted="0"
          }else{
            products[index].isupvoted ="1"
          }
        })
        res.status(200).send({
          products: products
        })
      }).catch(err=>{
        res.status(500).send({
          success: false,
          message:"Internal server error", 
          error: err
        })
      })

  }).catch(err=>{
    res.status(500).send({
      success: false,
      message:"Internal server error", 
      error: err
    })
  })
}

// ------- 

// search by phrase 

exports.searchByPhrase = (req, res) => {
  var {phrase , offset,user_id } = req.query; 
  Product.findAll({
    where: {
      itemName: {
        [Op.like]: `%${phrase}%`
      },
      id:{
        [Op.gt]: offset
      }
    }, 
    limit: 10
  }).then(products =>{
    var promises = [];
    products.forEach(product=>{
      var promise = Upvote.findOne({
        user_id: user_id, 
        product_id: product.id
      }); 
      promises.push(promise); 
    })
   
    Promise.all(promises).then(results=>{
      results.map((result, index)=>{
        if(result === null){
          products[index].isupvoted = "0"
        }else{  
           products[index].isupvoted = "1";
        }
      })
      res.status(200).send({
         products, phrase
      })
    }).catch(err=>{
      res.status(500).send({
        success: false,
        message:"Internal server error 1", 
        error: err
      })
    })
  }).catch(err => {
    res.status(500).send({
      success: false,
      message:"Internal server error", 
      error: err
    })
  })
}




exports.searchOnPopularProducts = (req, res) => {
  var {phrase , offset,user_id } = req.query; 
  Product.findAll({
    where: {
      itemName: {
        [Op.like]: `%${phrase}%`
      },
      id:{
        [Op.gt]: offset
      }
    },
    order:[
        ['upvoted', 'DESC']
    ], 
    limit: 10
  }).then(products =>{
    var promises = [];
    products.forEach(product=>{
      var promise = Upvote.findOne({
        user_id: user_id, 
        product_id: product.id
      }); 
      promises.push(promise); 
    })

    Promise.all(promises).then(results=>{
      results.map((result, index)=>{
        if(result === null){
          products[index].isupvoted="0"
        }else{
          products[index].isupvoted ="1"
        }
      })
      res.status(200).send({
         products, phrase
      })
    }).catch(err=>{
      res.status(500).send({
        success: false,
        message:"Internal server error", 
        error: err
      })
    })
  }).catch(err => {
    res.status(500).send({
      success: false,
      message:"Internal server error", 
      error: err
    })
  })
}




//--------------

// fetch all product by id 

// update a product 

// Delete a product