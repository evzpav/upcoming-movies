import axios from "axios";
import { apiUrl } from "../config/config";

function getPosts() {
  return baseRequest("GET", apiUrl, "/posts");
}

function baseRequest(method, url, uri, data = "") {
  return axios({
    method,
    timeout: 1000 * 5,
    url: `${url}/api${uri}`,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { getPosts };
