import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchShortTermTracks, fetchMediumTermTracks, fetchLongTermTracks, fetchRecentHistory,
  getConsistentFavsTracks, getDeepCutsTracks, getOnRepeatTracks, fetchUserID, createPlaylist, clearPlaylist,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class TracksAnalysis extends Component {
  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchLongTermTracks(this.props.token);
    this.props.fetchMediumTermTracks(this.props.token);
    this.props.fetchShortTermTracks(this.props.token);
    this.props.fetchRecentHistory(this.props.token);
  }

  handleTest = () => {
    const shortTermIDs = this.props.shortTermTracks.map((track) => {
      return (
        track.id
      );
    });
    const mediumTermIDs = this.props.mediumTermTracks.map((track) => {
      return (
        track.id
      );
    });
    const longTermIDs = this.props.longTermTracks.map((track) => {
      return (
        track.id
      );
    });
    const recentIDs = this.props.recentTracks.map((track) => {
      return (
        track.track.id
      );
    });

    this.props.getConsistentFavsTracks(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs);
    this.props.getDeepCutsTracks(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs);
    this.props.getOnRepeatTracks(this.props.token, shortTermIDs, recentIDs);
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
    longTermTracks: reduxState.tracks.longTerm,
    mediumTermTracks: reduxState.tracks.mediumTerm,
    shortTermTracks: reduxState.tracks.shortTerm,
    recentTracks: reduxState.recent.items,
    consistentFavs: reduxState.tracksAnalysis.consistentFavs,
    deepCuts: reduxState.tracksAnalysis.deepCuts,
    onRepeat: reduxState.tracksAnalysis.onRepeat,
    userID: reduxState.user.id,
    playlistImage: reduxState.playlist.image,
    playlistLink: reduxState.playlist.link,
  };
}

export default connect(mapStateToProps, {
  fetchShortTermTracks,
  fetchMediumTermTracks,
  fetchLongTermTracks,
  fetchRecentHistory,
  getConsistentFavsTracks,
  getDeepCutsTracks,
  getOnRepeatTracks,
  fetchUserID,
  createPlaylist,
  clearPlaylist,
})(TracksAnalysis);
