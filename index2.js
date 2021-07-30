const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTime = (passTime) => {
  for (let time of passTime) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTime(passTimes);
  })
  .catch((err) => {
    console.log("It didn't work: ", err.message);
  });
