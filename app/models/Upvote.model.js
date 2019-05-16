module.exports = (sequelize,Sequelize) => {
    const Upvote = sequelize.define('upvote', {
        product_id: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        }
    });

    return Upvote; 
}