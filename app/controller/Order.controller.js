const db = require('../config/db.config');

const orders = db.Order; 

// add new order to cart 

exports.addToCart = (req, res) =>{
    
    var {userid, orderId, items, timestamp} = req.body; 

    var Promises = []; 

    items.map((item, index)=>{

        var promise =  orders.create({
            orderId: orderId, 
            productName: item.productName,
            userId: userid, 
            image: item.image, 
            productId:item.productId, 
            price:item.price, 
            quantity: item.quantity, 
            discount: item.discount, 
            status:"PLACED", 
            timestamp:timestamp
        }); 
        Promises.push(promise); 
    }); 

    Promise.all(promise).then(results =>{
        res.status(200).send({
            success: true, 
            message: "We received your order. Working on it"
        }); 
    }).catch(err=>{
        res.status(500).send({
            success: false, 
            message: "Internal Server error"+err
        }); 
    })



}

