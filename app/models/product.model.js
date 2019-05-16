module.exports = (sequelize,Sequelize) => {
    const Product = sequelize.define('product', {
        itemName: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        image1: {
            type: Sequelize.INTEGER
        },
        image2: {
            type: Sequelize.INTEGER
        },
        image3: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        discount: {
            type: Sequelize.INTEGER
        },
        upvoted: {
            type: Sequelize.INTEGER
        }
    });

    return Product; 
}