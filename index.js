
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("24.80.160.1",(error, data) => {
//     //ip is fake
//   if (error) {
//     console.log(error);
//     return;
//   } 

//   const { latitude, longitude } = data;  
//     //let latitude = data.latitude
//     //let longtitude = data.longitude

//   console.log({latitude, longitude});

// });

fetchISSFlyOverTimes({ latitude: 49.2827291, longitude: -123.1207375 }, (error, data) => {
  if(error) {
    console.log(error);
    return;
  }
  
  console.log(data.response);
});



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  
  console.log(passTimes);
});