import React, { useState, useEffect } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "./Movies.css";
import { getUpcomingMovies } from "../api";
import MovieCard from "./MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

function Movies() {
  const [movies, setMovies] = useState([]);
  // const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const hasMore = page < totalPages;

  const listMovies = async () => {
    const resp = await getUpcomingMovies(page);
    let newMovies = resp.data.results;
    if (totalPages === 0){
      setTotalPages(resp.data.total_pages);
    }
    setMovies(movies.concat(newMovies));
    setPage(page+1)
  };

  useEffect(() => {
    listMovies();
  }, []);

  return (
    <div className="container">
      <div id="header">
        <div className="title">Upcoming Movies</div>
      </div>
      <input className="input" type="text" placeholder="Search..." />

      <InfiniteScroll
        dataLength={movies.length}
        next={listMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Total of {movies.length} movies.</b>
          </p>
        }
      >
        {movies.map((movie: any) => {
          return <MovieCard key={movie.id} movie={movie}></MovieCard>;
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Movies;
