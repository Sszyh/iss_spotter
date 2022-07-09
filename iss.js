const request = require('request');


const fetchMyIP = function(callback) {
  
  let url = `https://api.ipify.org?format=json`;
  request(url, function(error, response, body) {

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null,data["ip"]);
  
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  let url = `http://ipwho.is/${ip}`;
  request(url, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    if (data.success === false) {
      callback(data, null);
      return;
    }
    callback(null,data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };

