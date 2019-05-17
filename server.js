var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
});
 
require('./app/routes/product.routes.js')(app);
require('./app/routes/User.routes.js')(app);
require('./app/routes/Order.routes.js')(app);
 
// Create a Server
var server = app.listen(process.env.PORT || 3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})