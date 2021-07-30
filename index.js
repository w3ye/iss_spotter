const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((err, passTime) => {
  if (err) return console.log("It didn't work!", err);
  console.log(passTime);
});
