const axios = require("axios");

function baseRequest(url, timeout = 60) {
  return (method, uri, data = "") => {
    return axios({
      method,
      timeout: 1000 * timeout,
      url: `${url}${uri}`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}

function Client() {
  let request;
  (() => {
    request = baseRequest("https://jsonplaceholder.typicode.com");
  })();

  const getPosts = async page => {
    const resp = await request("GET", `/posts`, `&page=${page}`);
    return resp.data;
  };

  return {
    getPosts,
  };
}

module.exports = Client;
