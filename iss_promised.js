

const request = require('request-promise-native');
//const { fetchISSFlyOverTimes } = require('./iss');

const fetchMyIp = function() {
  return request("https://api64.ipify.org?format=json");
}

const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body).ip;
  return request(`http://ipwho.is/${data}`);
}

const fetchISSFlyOverTimes = function(loc) {
  const {latitude, longitude} = JSON.parse(loc);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function() {
  
  return fetchMyIp()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const output = JSON.parse(data).response;
    console.log(output)
    return output;
  });
  
}

module.exports = {nextISSTimesForMyLocation};