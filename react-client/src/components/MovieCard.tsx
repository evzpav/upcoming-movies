import React from "react";

import "./MovieCard.css";

const noImagePlaceholder = "/no-image-placeholder.png";

interface Movie {
  title: string;
  id: number;
  genres: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

function resolveImagePath(movie: Movie) {
  if (!movie || !movie.poster_path) {
    return noImagePlaceholder;
  }
  return movie.poster_path;
}

function MovieCard({ movie, onClick }: any) {
  return (
    <div className="card card-content" id="movie-card" onClick={onClick}>
      <div className="media-left" id="poster">
        <figure className="image is-128x128">
          <img src={resolveImagePath(movie)} alt={movie.title} />
        </figure>
      </div>
      <div className="media-content" id="title-content">
        <p className="title is-4">{movie.title}</p>
        <p className="subtitle is-6">{movie.genres}</p>
      </div>
      <div className="content" id="overview">
        <div id="overview-text">
          <b>Overview:</b> {movie.overview}
        </div>
        <div id="release-date">
          <b>Release Date:</b> {movie.release_date}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
