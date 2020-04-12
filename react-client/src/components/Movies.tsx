import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUpcomingMovies } from "../api";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "./Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const hasMore = page < totalPages;

  const listMovies = async () => {
    const resp = await getUpcomingMovies(page);
    let newMovies = resp.data.results;
    if (totalPages === 0) {
      setTotalPages(resp.data.total_pages);
    }
    setMovies(movies.concat(newMovies));
    setMoviesCopy(movies.concat(newMovies));
    console.log("movies", movies.length);
    console.log("moviesC", moviesCopy.length);

    setPage(page + 1);
  };

  const searchString = (item: string, input: string) => {
    return item.toLowerCase().match(input.toLowerCase());
  };

  const changeSearch = (e: any) => {
    setSearch(e.target.value);

    if (search) {
      const filtered = moviesCopy.filter(movie => searchString(movie["title"], search));
      setMovies(filtered);
    } else {
      setMovies(moviesCopy);
    }
  };

  useEffect(() => {
    listMovies();
  }, []);

  const endMessage = (
    <p style={{ textAlign: "center" }}>
      <b>Total of {movies.length} movies.</b>
    </p>
  );

  return (
    <div className="container">
      <div id="header">
        <div className="title">Upcoming Movies</div>
        <input
          className="input"
          id="search-input"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={changeSearch}
        />
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={listMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={movies.length > 0 ? endMessage : ""}
      >
        {movies.map((movie: any) => {
          return <MovieCard key={movie.id} movie={movie}></MovieCard>;
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Movies;
