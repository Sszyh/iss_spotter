
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("16.16.160.16",(error, data) => {
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

// fetchISSFlyOverTimes({ latitude: 49.2827291, longitude: -123.1207375 }, (error, data) => {
//   if(error) {
//     console.log(error);
//     return;
//   }
  
//   console.log(data.response);
// });



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  //console.log("pass",passTimes);
  //passTimes.response
  for (const pass of passTimes.response) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  //console.log(passTimes);
  }
  
});





// const printPassTimes = function(passTimes) {
//   console.log("pass",passTimes);
//   for (const pass of passTimes) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// };

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   printPassTimes(passTimes);
// });