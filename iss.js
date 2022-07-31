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
    console.log("inside fetchMyIp3");
    callback(null, ip);
    console.log("3-inside fetchMyIp1");//to help how callback works
  });
  console.log("1-inside fetchMyIp2");//to help how callback works
};

const fetchCoordsByIP = function(ipp, callback) {
  let url = `http://ipwho.is/${ipp}`;
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
    console.log("inside fetchCoords1");//to help how callback works
  });
  console.log("5-inside fetchCoords2");//to help how callback works
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
    console.log("inside overtime1");//to help how callback works
  });
  console.log("inside overtime2");//to help how callback works
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(error, null);
    } 
    console.log("inside next-fetch");//to help how callback works
    fetchCoordsByIP(ip, (err, location) => {
      if(err) {
        return callback(error, null);
      } 
      console.log("inside next-coord");//to help how callback works
      fetchISSFlyOverTimes(location, (err, time) => {
        if (err) {
          return callback(error, null)
        } 
        console.log("inside next-overtime1");//to help how callback works
        callback(null, time);
        console.log("inside next-overtime2")
      });
    });
    console.log("4-inside next1");//to help how callback works
  });
  console.log("2-inside next2");//to help how callback works
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };