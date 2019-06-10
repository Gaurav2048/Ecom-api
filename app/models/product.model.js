module.exports = (sequelize,Sequelize) => {
    const Product = sequelize.define('product', {
        itemName: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        image1: {
            type: Sequelize.STRING
        },
        image2: {
            type: Sequelize.STRING
        },
        image3: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        discount: {
            type: Sequelize.INTEGER
        },
        upvoted: {
            type: Sequelize.INTEGER
        },
        isupvoted:{
                type:Sequelize.VIRTUAL
        } 
    });

    return Product; 
}