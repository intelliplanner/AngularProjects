// Import dependencies




// Load controllers
module.exports = function(app) {
	
console.log("mainController routes")
require('./mainController')(app)
console.log("user routes")
require('./controllers/user')(app)
console.log("payment routes")
require('./controllers/payment')(app)
console.log("driver routes")
require('./controllers/driver')(app)
console.log("transporter routes")
require('./controllers/transporter')(app)
console.log("admin routes")
require('./controllers/admin')(app)
console.log("webhooks routes")
require('./controllers/webhooks')(app)
console.log("soap routes")
require('./controllers/soap')(app)

};
