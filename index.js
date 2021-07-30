const { nextISSTimeForMyLocation } = require('./iss');

const printPassTime = (passTime) => {
  for (let time of passTime) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }
};

nextISSTimeForMyLocation((err, passTime) => {
  if (err) return console.log("It didn't work!", err);
  printPassTime(passTime);
});
