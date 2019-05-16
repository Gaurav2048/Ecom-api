const db = require('../config/db.config');

const orders = db.Order; 

// add new order to cart 

exports.addToCart = (req, res) =>{
    orders.create({
        userid: req.body.userid, 
        orderAmount: req.body.orderAmount, 
        status: req.body.status
    }).then(order =>{
        if(!order){
            return res.status(400).send({
                success:false,
                message:"unable to place order"
            });
        }

        res.status(200).send({
            success: true,
            message: " Order has been placed"
        })
    }).catch(err=>{
        res.status(500).send({
            success:false,
            message:"Intrnal server error",
            error: err
        });
    });
}

