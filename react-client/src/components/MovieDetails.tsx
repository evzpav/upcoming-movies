import React from "react";
import Modal from "./Modal";
import "./MovieDetails.css"

const noImagePlaceholder = "/no-image-placeholder.png";


const MovieDetails = ({ toggleModal, modalOpen, details }: any) => {
  
  const resolveImagePath = (movie:any)=> {
    if (!movie || !movie.poster_path) {
      return noImagePlaceholder;
    }
    return movie.poster_path;
  }

  return (
    <Modal closeModal={toggleModal} modalState={modalOpen}>
       <div className="card" id="modal-card">
      <div id="modal-image">
        <img id="poster" src={resolveImagePath(details)} alt={details.title} />
      </div>
      <div id="overview-content">
        <p className="title is-2">{ details.title }</p>
        <p className="subtitle is-4">{ details.tagline }</p>
        <p className="subtitle is-6">{ details.genres }</p>

    
        <div id="overview-text">{ details.overview }</div>

        <p className="subtitle is-6">Release date: { details.release_date}</p>

        <p className="subtitle is-6">Production: { details.production_countries}</p>

        <div id="ok-button">
          {/* <button onClick={toggleModal}>OK</button> */}
        </div>
      </div>
    </div>

    </Modal>
  );
};

export default MovieDetails;
