const request = require('request');

// Gets the JSON from api
const getJSON = (api, callback) => {
  request(api, (err, response, body) => {
    if (err) return callback(err);

    if (response.statusCode === 200) {
      return callback(null, JSON.parse(body));
    } else {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg));
    }
  });
};

const fetchMyIP = (callback) => {
  const ipfyApi = 'https://api.ipify.org?format=json';
  getJSON(ipfyApi, (err, ipObj) => {
    if (err) return callback(err);
    return callback(null, ipObj.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const geoipApi = `https://freegeoip.app/json/${ip}`;

  getJSON(geoipApi, (err, obj) => {
    if (err) return callback(err);
    const coord = {
      latitude: obj.latitude,
      longitude: obj.longitude
    };
    console.log();
    return callback(null, coord);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const LAT = coords.latitude;
  const LON = coords.longitude;
  const openNotifyApi = `http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`;

  getJSON(openNotifyApi, (err, obj) => {
    if (err) return callback(err);
    return callback(null, obj.response);
  });
};

const nextISSTimeForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) return callback(err);

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return callback(err);

      fetchISSFlyOverTimes(coords, (err, passTime) => {
        if (err) return callback(err);
        return callback(null, passTime);
      });
    });
  });
};

module.exports = {nextISSTimeForMyLocation};
