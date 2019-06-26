'use strict';

const logger = require('logger').createLogger('weather_route.log');
const request = require('request-promise');
const response = require('../helpers/response');

function WeatherController(){

    /*
        Info: This method will check if given date is prime number or not
        param: date (number)
        return: bool
    */
    let isPrimeNumber = function(date){
        //date validation
        if(isNaN(date) || date<1 || date>31){
            return false;
        }

        // Prime Number Validation
        if (date===1) {
            return false;
        } else if(date === 2) {
            return true;
        } else {
            for(var x = 2; x < date; x++) {
                if(date % x === 0) {
                    return false;
                }
            }
            return true;  
        }
    };

    this.get = function(req,res,next){
        logger.info(req.url,req.params);

        let city  = req.params.city;
        let date = req.params.date;

        if(isPrimeNumber(date)){
            logger.info(`${date} - Found prime date.`, 'Calling Weather API.');

            request(`${global.WEATHER_BASE_URL}?q=${city}&appid=${global.WEATHER_APPID}`)
                .then(function (report) {
                    logger.log(report);

                    response.sendResult(res,200,JSON.parse(report),next);
                })
                .catch(function (err) {
                    logger.error(JSON.parse(err.error).message);
                    response.sendError(res,err.statusCode,JSON.parse(err.error).message,next);
                });

        }else{
            logger.error("Date is not prime so no date")
            response.sendError(res,403,"Date is not prime so no date",next);
        }
    };

};

module.exports = new WeatherController();