'use strict';

const restify = require('restify');
const weather = require('./routes/weather');
const DEFAULT_PORT = 8080;
const server = restify.createServer({
	name: 'server',
	version: '1.0.0'
});


function corsHandler(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	
	return next();
}
function optionsRoute(req, res, next) {
	res.send(200);
	return next();
}
server.opts('/\.*/', corsHandler, optionsRoute);
server.use(restify.plugins.bodyParser());

/* Setting Global */
global.WEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
global.WEATHER_APPID = 'db44a86d5e096513f2fc30e11e29e4b8';
/*End */

/*================Route List==================== */
server.get('api/weather/:city',weather.get);
/*============================================== */

server.listen(DEFAULT_PORT, function(){
	console.log('SERVER STATED AT '+DEFAULT_PORT);
});