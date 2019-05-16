const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const db = require('../config/db.config');

const User = db.User; 

verifyToken  = (req, res, next)=>{
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            auth: false, message: "no token provided"
        });
    }

    jwt.verify(token, config.secret, (err, decode)=>{
        if(err){
            return res.status(500).send({
                auth:false, 
                message: "Failed to authenticate for causes "+ err
            });
        }

        req.userId = decode.id; 
        next(); 
    });

}

const authJwt = {};
authJwt.verifyToken = verifyToken; 
module.exports = authJwt; 