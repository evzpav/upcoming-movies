<template>
  <div class="container">
    <div id="header">
      <div class="title">Upcoming Movies</div>
      <b-field>
        <b-input
          placeholder="Search..."
          type="search"
          icon="magnify"
          icon-clickable
          v-model="search"
        >
        </b-input>
      </b-field>
    </div>
    <span v-if="loading && moviesList.length === 0">Loading movies...</span>
    <span v-if="!loading && moviesList.length === 0">No movie found</span>
    <div v-for="movie in moviesList" :key="movie.id">
      <div class="card card-content" id="movie-card" @click="openDetailsModal(movie.id)">
        <div class="media-left" id="poster">
          <figure class="image is-128x128">
            <img :src="resolveImagePath(movie)" :alt="movie.title" />
          </figure>
        </div>
        <div class="media-content" id="title-content">
          <p class="title is-4">{{ movie.title }}</p>
          <p class="subtitle is-6">{{ movie.genres }}</p>
        </div>
        <div class="content" id="overview">
          <div id="overview-text"><b>Overview:</b> {{ movie.overview }}</div>
          <div id="release-date"><b>Release Date:</b> {{ movie.release_date }}</div>
        </div>
      </div>
    </div>
    <div
      v-infinite-scroll="listMovies"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="200"
      infinite-scroll-throttle-delay="500"
      infinite-scroll-immediate-check="false"
    ></div>
    <div v-if="noMorePagesToLoad && !search">Total of {{ moviesList.length }} movies.</div>

    <movie-details :activeDetailsModal.sync="activeDetailsModal" :details="details"></movie-details>
  </div>
</template>

<script>
import MovieDetails from "./MovieDetails";
import { getUpcomingMovies, getMovieDetails } from "../api";

const noImagePlaceholder = "/no-image-placeholder.png";

export default {
  components: { MovieDetails },
  created() {
    this.listMovies();
  },
  data: () => ({
    loading: false,
    movies: [],
    moviesList: [],
    search: "",
    page: 1,
    totalPages: null,
    details: null,
    activeDetailsModal: false,
    noMorePagesToLoad: false,
  }),
  methods: {
    async listMovies() {
      this.loading = true;
      const loadingComponent = this.$buefy.loading.open({ container: null });

      if (this.totalPages && this.page > this.totalPages) {
        loadingComponent.close();
        this.noMorePagesToLoad = true;
        this.loading = false;
        return false;
      }

      try {
        const resp = await getUpcomingMovies(this.page);
        this.page += 1;

        if (!this.totalPages) {
          this.totalPages = resp.data.total_pages;
        }
        this.movies.push(...resp.data.results);
        this.moviesList = this.movies;
      } catch (error) {
        console.log(error);

        this.showToast("Failed to load movies. Please try again later.");
      } finally {
        loadingComponent.close();
        this.loading = false;
      }
    },

    resolveImagePath(movie) {
      if (!movie || !movie.poster_path) {
        return noImagePlaceholder;
      }
      return movie.poster_path;
    },

    async openDetailsModal(id) {
      this.activeDetailsModal = true;
      const details = await this.loadDetails(id);
      if (details) {
        this.details = details;
        this.activeDetailsModal = true;
      }
    },

    async loadDetails(id) {
      this.loading = true;
      const loadingComponent = this.$buefy.loading.open({ container: null });
      try {
        const resp = await getMovieDetails(id);
        return resp.data;
      } catch (error) {
        console.log(error);

        this.showToast("Failed to load movie details. Please try again later.");
      } finally {
        loadingComponent.close();
        this.loading = false;
      }
    },
    searchString(item, input) {
      return item.toLowerCase().match(input.toLowerCase());
    },
    showToast(msg) {
      this.$buefy.toast.open({
        duration: 3000,
        message: msg,
        position: "is-bottom",
        type: "is-dark",
      });
    },
  },
  watch: {
    search() {
      if (this.search) {
        this.moviesList = [];
        this.moviesList = this.movies.filter(movie => {
          return this.searchString(movie.title, this.search);
        });
      } else {
        this.moviesList = this.movies;
      }
    },
  },
};
</script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
}

#movie-card {
  height: 240px;
  cursor: pointer;
  display: flex;
}

#title-content {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 250px;
}

#overview {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-left: 10px;
}

#overview-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 600px) {
  #header {
    flex-direction: column;
  }

  #movie-card {
    flex-direction: column;
    height: 450px;
  }

  #poster {
    height: 192px;
    display: flex;
    justify-content: center;
  }

  #title-content {
    order: -1;
    flex-basis: 60px;
    margin-bottom: 5px;
  }

  #title-content .subtitle {
    font-size: 12px;
  }

  #title-content .title {
    font-size: 0.9em;
  }

  #overview {
    margin-left: 0px;
    margin-top: 5px;
    justify-content: space-between;
    font-size: 0.85em;
  }

  #overview-text {
    max-height: 140px;
  }
}
</style>
