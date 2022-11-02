// const axios = require("axios");
// const params = {
//   access_key: "72ceb2ebcbb5a9a92c5d26876b68e350",
//   query: "Hyderabad",
// };

// axios
//   .get("http://api.positionstack.com/v1/forward", { params })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

const postman_request = require("postman-request");
// const geocode = (address, callback) => {
//   console.log("I am: ", callback);
//   // const url =
//   // "http://api.positionstack.com/v1/forward?access_key=72ceb2ebcbb5a9a92c5d26876b68e350&query="+ address +"&limit=1";
//   const url = `http://api.positionstack.com/v1/forward?access_key=72ceb2ebcbb5a9a92c5d26876b68e350&query=${address}&limit=1`;
//   postman_request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to access location services!", undefined);
//       // } else if (response.body.data.length === 0) {
//     } else if (
//       response.body.data == undefined ||
//       response.body.data.length === 0
//     ) {
//       callback(
//         "Unable to get location!Try again with different search terms",
//         undefined
//       );
//     } else {
//       const data = response.body.data[0];
//       callback(
//         undefined,
//         {
//           latitude: data.latitude,
//           longitude: data.longitude,
//           location: data.name,
//         }
//         // `The latitude and longitude of ${data.name} are ${data.latitude} and ${data.longitude} respectively.`
//       );
//     }
//   });
// };

//oject destructuring and shorthand

const geocode = (address, callback) => {
  console.log("I am: ", callback);
  // const url =
  // "http://api.positionstack.com/v1/forward?access_key=72ceb2ebcbb5a9a92c5d26876b68e350&query="+ address +"&limit=1";
  const url = `http://api.positionstack.com/v1/forward?access_key=72ceb2ebcbb5a9a92c5d26876b68e350&query=${address}&limit=1`;
  postman_request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to access location services!", undefined);
      // } else if (response.body.data.length === 0) {
    } else if (body.data == undefined || body.data.length === 0) {
      callback(
        "Unable to get location!Try again with different search terms",
        undefined
      );
    } else {
      const data = body.data[0];
      callback(
        undefined,
        {
          latitude: data.latitude,
          longitude: data.longitude,
          location: data.name,
        }
        // `The latitude and longitude of ${data.name} are ${data.latitude} and ${data.longitude} respectively.`
      );
    }
  });
};

module.exports = geocode;

// function printer(error, data) {
//   console.log("error", error);
//   console.log("data", data);
// }
