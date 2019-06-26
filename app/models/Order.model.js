module.exports = (sequelize , Sequelize)=>{
    const Order= sequelize.define('orders', {
        orderId: {
            type: Sequelize.STRING,
            allowNull : false
        },
        productName:{
            type: Sequelize.STRING,
            allowNull : false
        }, 
        userId:{
            type: Sequelize.STRING,
            allowNull : false
        }, 
        image:{
            type: Sequelize.STRING
        },
        productId:{
            type: Sequelize.STRING,
            allowNull : false
        },
        price:{
            type:Sequelize.STRING,
            allowNull : false
        },
        quantity: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        discount:{
            type:Sequelize.STRING,
            allowNull : false
        },
        status:{
            type: Sequelize.STRING,
            allowNull : false
        },
        timestamp:{
            type: Sequelize.STRING,
            allowNull : false
        }, 
        delivery:{
            type: Sequelize.STRING
        }
    });

    return Order; 
}