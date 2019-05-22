module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {

        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        token: {
            type: Sequelize.STRING
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING
        }
    });

    User.methods.generatiAuthToken= function() {

        var user = this;
        var access = 'auth';
        var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();
         user.tokens=  user.tokens.concat([{access, token}]);
        return  user.save().then(()=> {
          return token;
        });
        
        
        };
        

    return User;
}