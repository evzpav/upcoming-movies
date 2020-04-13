import React, { useState, useEffect, ReactElement } from "react";
import { getUpcomingMovies, getMovieDetails } from "../api";
import { ToastContainer, toast } from "react-toastify";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "react-toastify/dist/ReactToastify.css";
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

  const notify = (msg: string) =>
    toast.error(msg, { position: "top-right", autoClose: 5000, hideProgressBar: true });

  const loadMovies = async (page: number) => {
    setLoadingMovies(true);
    try {
      const resp = await getUpcomingMovies(page);
      return resp.data;
    } catch (error) {
      console.log(error);
      notify("failed to load movies");
    } finally {
      setLoadingMovies(false);
    }
  };

  const listMovies = async () => {
    const data = await loadMovies(page);
    if (!data || !data.results) {
      return;
    }
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
      notify("failed to load details");
    } finally {
      setLoadingDetails(false);
    }
  };

  const openDetailsModal = async (id: any) => {
    const details = await loadDetails(id);
    if (!details) {
      return;
    }
    setModalState(!modalState);
    setMovieDetails(details);
  };

  const toggleModal = (): void => {
    setModalState(!modalState);
  };

  useEffect(() => {
    listMovies();
  }, [page]);

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
          {movies.map((movie: any, index: number) => {
            return (
              <MovieCard
                key={movie.id + index}
                movie={movie}
                onClick={() => openDetailsModal(movie.id)}
              ></MovieCard>
            );
          })}
        </InfiniteScroll>
        <Spinner loading={loadingMovies} />
        <ToastContainer hideProgressBar />
      </div>
    </section>
  );
}

export default Movies;
