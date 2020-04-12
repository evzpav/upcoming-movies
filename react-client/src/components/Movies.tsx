import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";

import InfiniteScroll from "react-infinite-scroll-component";
import { getUpcomingMovies, getMovieDetails } from "../api";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "./Movies.css";

function Movies() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const hasMore = page < totalPages;

  const listMovies = async () => {
    const resp = await getUpcomingMovies(page);
    let newMovies = resp.data.results;
    if (totalPages === 0) {
      setTotalPages(resp.data.total_pages);
    }
    setMovies(movies.concat(newMovies));
    setMoviesCopy(movies.concat(newMovies));
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

  const toggleModal = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    listMovies();
  }, []);

  const loadDetails = async (id: number) => {
    setLoading(true);
    try {
      const resp = await getMovieDetails(id);
      return resp.data;
    } catch (error) {
      console.log(error);
      alert("couild not load details")
    } finally {
      setLoading(false);
    }
  };
  const openDetailsModal = async (id: any) => {
    const details = await loadDetails(id)
    console.log("open modal", id);
    setModalState(!modalState);
    setMovieDetails(details);
  };

  const endMessage =
    movies.length > 0 ? (
      <p style={{ textAlign: "center" }}>
        <b>Total of {movies.length} movies.</b>
      </p>
    ) : (
      ""
    );

  return (
    <div className="container">
      <MovieDetails
        toggleModal={toggleModal}
        modalOpen={modalState}
        details={movieDetails}
      ></MovieDetails>
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
        endMessage={endMessage}
      >
        {movies.map((movie: any) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => openDetailsModal(movie.id)}
            ></MovieCard>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Movies;
