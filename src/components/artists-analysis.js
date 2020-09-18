import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchShortTermArtists, fetchMediumTermArtists, fetchLongTermArtists,
  getConsistentFavsArtists, getDeepCutsArtists, getOnRepeatArtists, fetchUserID, createPlaylist, clearPlaylist,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class ArtistsAnalysis extends Component {
  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchLongTermArtists(this.props.token);
    this.props.fetchMediumTermArtists(this.props.token);
    this.props.fetchShortTermArtists(this.props.token);
  }

  handleTest = () => {
    const longTermIDs = this.props.longTermArtists.map((artist) => {
      return (
        artist.id
      );
    });
    const mediumTermIDs = this.props.mediumTermArtists.map((artist) => {
      return (
        artist.id
      );
    });
    const shortTermIDs = this.props.shortTermArtists.map((artist) => {
      return (
        artist.id
      );
    });

    this.props.getConsistentFavsArtists(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs);
    this.props.getDeepCutsArtists(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs);
    this.props.getOnRepeatArtists(this.props.token, mediumTermIDs, shortTermIDs);
  }

  /*
  handleCreatePlaylist = () => {
    const uris = this.props.tracks.map((track) => {
      return (
        track.uri
      );
    });

    let name = 'On Repeat';

    if (this.props.view === 'consistent_favorites') {
      name = 'Consistent Favorites';
    } else if (this.props.view === 'deep_cuts') {
      name = 'Deep Cuts';
    }

    this.props.createPlaylist(this.props.token, this.props.userID, name, uris);
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }
  */

  renderConsistentFavorites = () => {
    return <div />;
  }

  renderDeepCuts = () => {
    return <div />;
  }

  renderOnRepeat = () => {
    return <div />;
  }

  /* I used this to figure out how to add the selected class https://www.andreasreiterer.at/dynamically-add-classes/ */
  /* I used this for the modal: https://github.com/reactjs/react-modal */
  render() {
    return (
      <div className="main">
        <button type="button" onClick={this.handleTest}>Test</button>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    longTermArtists: reduxState.artists.longTerm,
    mediumTermArtists: reduxState.artists.mediumTerm,
    shortTermArtists: reduxState.artists.shortTerm,
    consistentFavs: reduxState.artistsAnalysis.consistentFavs,
    deepCuts: reduxState.artistsAnalysis.deepCuts,
    onRepeat: reduxState.artistsAnalysis.onRepeat,
    userID: reduxState.user.id,
    playlistImage: reduxState.playlist.image,
    playlistLink: reduxState.playlist.link,
  };
}

export default connect(mapStateToProps, {
  fetchShortTermArtists,
  fetchMediumTermArtists,
  fetchLongTermArtists,
  getConsistentFavsArtists,
  getDeepCutsArtists,
  getOnRepeatArtists,
  fetchUserID,
  createPlaylist,
  clearPlaylist,
})(ArtistsAnalysis);
