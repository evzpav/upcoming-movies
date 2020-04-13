<template>
  <b-modal :active.sync="showModal" :width="1000">
    <div class="card" id="modal-card" v-if="details && details.title && showModal">
      <div id="modal-image">
        <img id="poster" :src="resolveImagePath(details)" :alt="details.title" />
      </div>
      <div id="overview-content">
        <p class="title is-2">{{ details.title }}</p>
        <p class="subtitle is-4">{{ details.tagline }}</p>
        <p class="subtitle is-6">{{ details.genres }}</p>

        <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-info">{{ details.vote_average }}</span>
              <span class="tag is-seconday">Vote Average</span>
            </div>
          </div>

          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-info">{{ details.vote_count }}</span>
              <span class="tag is-seconday">Votes</span>
            </div>
          </div>

          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-info">{{ details.popularity }}</span>
              <span class="tag is-seconday">Popularity</span>
            </div>
          </div>
        </div>

        <div id="overview-text">{{ details.overview }}</div>

        <p class="subtitle is-6">Release date: {{ details.release_date }}</p>

        <p class="subtitle is-6">Production: {{ details.production_countries }}</p>

        <div id="ok-button">
          <button @click="showModal = false" class="input">OK</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
const noImagePlaceholder = "/no-image-placeholder.png";
export default {
  props: {
    details: Object,
    activeDetailsModal: Boolean,
  },
  data: () => ({
    showModal: false,
  }),

  methods: {
    resolveImagePath(movie) {
      if (!movie || !movie.poster_path) {
        return noImagePlaceholder;
      }
      return movie.poster_path;
    },
  },

  watch: {
    showModal(value) {
      this.$emit("update:activeDetailsModal", value);
    },
    details() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
#modal-card {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: row;
  align-items: flex-start;
}

#modal-image {
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  display: flex;
}

#poster {
  height: 80vh;
  max-width: 500px;
}

#overview-content {
  display: flex;
  flex-grow: 0;
  flex-shrink: 2;
  padding: 20px;
  align-items: flex-start;
  flex-direction: column;
  height: 80vh;
  position: relative;
}

#overview-text {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 0.9em;
}

#release-date {
  margin-bottom: 15px;
}

#ok-button {
  align-self: center;
  position: absolute;
  bottom: 50px;
}

@media screen and (max-width: 600px) {
  #poster {
    height: 50vh;
  }

  #modal-card {
    flex-direction: column;
    padding: 5px;
  }

  #overview-content {
    padding: 5px;
    margin-left: 10px;
  }

  #modal-image {
    align-self: center;
  }
  p.subtitle {
    font-size: 0.85em;
  }

  #ok-button {
    display: none;
  }
}
</style>
