const env = {
    database: 'Ecom-api',
    username: 'b7d9cd89717728',// root
    password: '6e88f948',
    heroku: 'mysql://b7d9cd89717728:6e88f948@us-cdbr-iron-east-02.cleardb.net/heroku_49b205d9e226867?reconnect=true',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  module.exports = env;
  