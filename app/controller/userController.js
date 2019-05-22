const db = require('../config/db.config');

const config = require('../config/config');

const User = db.User;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res)=>{
    User.create({
        name: req.body.name,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        image: req.body.image
    }).then(user=>{
        if(!user){
            return res.status(400).send({
                success: false,
                "message":"unable to create user"
            })
        };

        return res.status(200).send({
            success: true, 
            "message":"user created",
            user
        })
    }).catch(err=>{
        res.status(500).send({
            success: true,
            "message": "unable to register user now"
        })
    })
}

exports.signIn = (req, res)=> {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user=>{
        if(!user){
            return res.status(400).send({
                success: false,
                "message": "user not found"
            })
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                success: false, accessToken: null, message:"Password is invalid"
            });
        }

        var token = jwt.sign({id:user.id}, config.secret, {
            expiresIn: 30*86400 // 24 hours
        });

        User.save().then(()=>{
            res.status(200).send({
                success: true, accessToken: token, message:"You are in"
            }); 
        }).catch(err=>{
            res.status(500).send({
                success: false,
                message: "Internal server error"+err
            });
        })
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: "Internal server error"+err
        });
    });

}