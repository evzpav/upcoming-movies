import axios from "axios";
import config from "../config";

function getUpcomingMovies(page: number): Promise<any> {
    return baseRequest("GET", config.apiUrl, `/movie/upcoming?page=${page}`);
}
function getMovieDetails(id: number): Promise<any> {
    return baseRequest("GET", config.apiUrl, `/movie/${id}`);
}

function baseRequest(method: any, url: string, uri: string, data = ""): Promise<any> {
    return axios({
        method: method,
        timeout: 1000 * 5,
        url: `${url}/api${uri}`,
        data,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export { getUpcomingMovies, getMovieDetails };