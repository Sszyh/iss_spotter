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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  //console.log(latitude);
  let url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(url, function(error, response, body) {
    
    
    
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyovertime. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);

    callback(null,data);
  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  // empty for now
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation };

