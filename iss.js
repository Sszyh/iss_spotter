const request = require('request');

const fetchMyIP = function(callback) {
  let url = `https://api64.ipify.org?format=json`;
  request(url, function(error, response, body) {
    if (error) return callback(error, null);//error may come from a invalid domain, user is offline.
     
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      //if console "response" here, we will receive a huge obj and response.
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let url = `http://ipwho.is/${ip}`;
  request(url, function(error, response, body) {
    if (error) return callback(error, null);

    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }
    //destructure
    const {latitude, longitude} = data;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  let url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Overtime Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const resp = data.response;
    callback(null, resp);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(error, null);
    } 
    fetchCoordsByIP(ip, (err, location) => {
      if(err) {
        return callback(error, null);
      } 
      fetchISSFlyOverTimes(location, (err, time) => {
        if (err) {
          return callback(error, null)
        } 
        callback(null, time)
      });
    });
  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };