const spacetime = require("spacetime");
const axios = require("axios");

const baseRequest = (url, apiToken, timeout = 60) => {
  return (method = "GET", uri, queryParams = "") => {
    return axios({
      method,
      timeout: 1000 * timeout,
      url: `${url}${uri}?api_key=${apiToken}${queryParams}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

const formatDate = date => {
  return spacetime(date).unixFmt("dd MMMM yyyy");
};
module.exports = { baseRequest, formatDate };
