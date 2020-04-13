import React, { useState, useEffect, ReactElement } from "react";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUpcomingMovies, getMovieDetails } from "../api";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "./Movies.css";

function Movies(): ReactElement {
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const hasMore = page < totalPages;

  const loadMovies = async (page: number) => {
    setLoadingMovies(true);
    try {
      const resp = await getUpcomingMovies(page);   
      return resp.data
    } catch (error) {
      console.log(error);
      alert("could not load movies");
    } finally {
      setLoadingMovies(false);
    }
  };

  const listMovies = async () => {
    const data = await loadMovies(page);
    const newMovies = data.results;
    if (totalPages === 0) {
      setTotalPages(data.total_pages);
    }
    setMovies(movies.concat(newMovies));
    setMoviesCopy(movies.concat(newMovies));
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

  const loadDetails = async (id: number) => {
    setLoadingDetails(true);
    try {
      const resp = await getMovieDetails(id);
      return resp.data;
    } catch (error) {
      console.log(error);
      alert("could not load details");
    } finally {
      setLoadingDetails(false);
    }
  };

  const openDetailsModal = async (id: any) => {
    const details = await loadDetails(id);
    setModalState(!modalState);
    setMovieDetails(details);
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    listMovies();
  }, [listMovies, page]);

  const endMessage =
    movies.length > 0 ? (
      <p style={{ textAlign: "center" }}>
        <b>Total of {movies.length} movies.</b>
      </p>
    ) : (
      ""
    );

  const infiniteScrollStyle = {
    overflow: "hidden",
  };

  return (
    <section>
      <Spinner loading={loadingDetails} />
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
          style={infiniteScrollStyle}
          dataLength={movies.length}
          next={() => setPage(page + 1)}
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
        <Spinner loading={loadingMovies} />
      </div>
    </section>
  );
}

export default Movies;
