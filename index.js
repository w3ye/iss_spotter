const {fetchMyIP,
       fetchCoordsByIP,
       fetchISSFlyOverTimes
      } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  fetchCoordsByIP(ip, (err, coord) => {
    if (err) return console.log(err);

    fetchISSFlyOverTimes(coord, (err, data) => {
      if (err) return console.log(err);

      console.log(data);
    })
  });
});
