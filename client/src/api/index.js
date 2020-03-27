import axios from "axios";
import { apiUrl } from "../config/config";

function getUpcomingMovies(page) {
  return baseRequest("GET", apiUrl, `/movie/upcoming?page=${page}`);
}
function getMovieDetails(id) {
  return baseRequest("GET", apiUrl, `/movie/${id}`);
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

export { getUpcomingMovies, getMovieDetails };
