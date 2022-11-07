const postman_request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=55252f87bca3469eb71d5cb167fdd43b&query=${latitude},${longitude}`;

  //   postman_request({ url: url, json: true }, (error, response) => {
  //     // console.log(error);
  //     if (error) {
  //       callback("Unable to access the weather service!", undefined);
  //     } else if (response.body.error) {
  //       callback("Unable to find location!", undefined);
  //     } else {
  //       // console.log(response.body.current);
  //       const current = response.body.current;
  //       callback(
  //         undefined,
  //         `${current.weather_descriptions[0]} : It is currently ${current.temperature} degrees out. But it feels like ${current.feelslike} degrees.`
  //       );
  //     }
  //   });
  // };

  //object destructuring and shorthand
  postman_request({ url, json: true }, (error, { body }) => {
    // console.log(error);
    if (error) {
      callback("Unable to access the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      // console.log(response.body.current);
      const current = body.current;
      callback(
        undefined,
        `${current.weather_descriptions[0]} : It is currently ${current.temperature} degrees out. But it feels like ${current.feelslike} degrees.
        The humidity is ${current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
