module.exports = (sequelize,Sequelize) => {
    const Category = sequelize.define('category', {
        categoryName: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return Category; 
}