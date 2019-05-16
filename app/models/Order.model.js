module.exports = (sequelize , Sequelize)=>{
    const Order= sequelize.define('orders', {
        userid: {
            type: Sequelize.STRING
        },
        orderAmount: {
            type: Sequelize.INTEGER
        },
        status:{
            type: Sequelize.STRING
        }
    });

    return Order; 
}