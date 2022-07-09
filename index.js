
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("24.80.160.16",(error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   } 

//   const { latitude, longitude } = data;  
//     //let latitude = data.latitude
//     //let longtitude = data.longitude

//   console.log({latitude, longitude});

// });