const { formatDate } = require("../utils");

class Movie {
  constructor(movie, imageBaseUrl, genreObj) {
    this.id = movie.id;
    this.title = movie.title;
    this.poster_path = this.resolvePath(movie, imageBaseUrl);
    this.genres = this.convertGenresToString(movie.genre_ids, genreObj, movie.genres);
    this.overview = movie.overview;
    this.release_date = formatDate(movie.release_date);

    if (!genreObj) {
      this.production_countries = this.convertProductionCountriesToString(
        movie.production_countries,
      );
      this.tagline = movie.tagline;
      this.popularity = movie.popularity;
      this.vote_count = movie.vote_count;
      this.vote_average = movie.vote_average;
    }
  }

  convertGenresToString(genresIds, genreObj, genres) {
    if (genresIds) {
      return genresIds
        .map(id => genreObj[id])
        .filter(g => g !== undefined)
        .join(", ");
    }

    if (genres) {
      return genres
        .map(g => g.name)
        .sort()
        .join(", ");
    }
  }

  convertProductionCountriesToString(production_countries) {
    if (!production_countries) return "";
    return production_countries.map(c => c.name).join(", ");
  }

  resolvePath(details, imageBaseUrl) {
    const path = details.poster_path || details.backdrop_path;
    return path ? imageBaseUrl + path : "";
  }
}

module.exports = Movie;
