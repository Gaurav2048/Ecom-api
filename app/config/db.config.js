const env = require('./env'); 

const Sequelize = require('sequelize');

// const sequelize = new Sequelize(env.database,
//                                 env.username,
//                                 env.password,
//                                 {
//                                     host: env.host,
//                                     dialect:env.dialect,
//                                     OperatorsAliases:false,

//                                     pool:{
//                                         max:env.pool.max,
//                                         min: env.pool.min,
//                                         acquire: env.pool.acquire,
//                                         idle: env.pool.idle
//                                     }
//                                 }
//     ); 

const sequelize = new Sequelize(env.heroku, {
        dialect:env.dialect
    }
); 



    const db = {}; 

    db.Sequelize = Sequelize;
    db.sequelize = sequelize; 

    // adding model and it's table 

    db.products = require('../models/product.model.js')(sequelize,Sequelize);
    db.User = require('../models/User.model.js')(sequelize,Sequelize); 
    db.Order= require('../models/Order.model.js')(sequelize,Sequelize); 
    db.Caterogy = require('../models/Caterogy.model.js')(sequelize, Sequelize);
    db.Upvote = require('../models/Upvote.model.js')(sequelize,Sequelize); 

    db.Caterogy.hasMany(db.products,{foreignKey:'id'})


    module.exports = db; 