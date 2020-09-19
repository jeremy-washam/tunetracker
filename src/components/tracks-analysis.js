import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchShortTermTracks, fetchMediumTermTracks, fetchLongTermTracks, fetchRecentHistory,
  getConsistentFavsTracks, getDeepCutsTracks, getOnRepeatTracks, fetchUserID, clearPlaylist, createPlaylist,

} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class TracksAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchLongTermTracks(this.props.token);
    this.props.fetchMediumTermTracks(this.props.token);
    this.props.fetchShortTermTracks(this.props.token);
    this.props.fetchRecentHistory(this.props.token);

    /* Handle analysis uses the result of the redux actions above, so need to wait until those are finished to run the analsis */
    /* Couldn't find a better way to do this, need to use asych functions but I couldn't figure it out */
    /* This displays the result of handle analysis as soon as possible, but makes sure that it doesn't miss anything */
    setTimeout(() => {
      this.handleAnalysis();
    }, 500);
    setTimeout(() => {
      this.handleAnalysis();
    }, 750);
    setTimeout(() => {
      this.handleAnalysis();
    }, 1000);
    setTimeout(() => {
      this.handleAnalysis();
    }, 1250);
    setTimeout(() => {
      this.handleAnalysis();
    }, 1500);
    setTimeout(() => {
      this.handleAnalysis();
    }, 2000);
  }

  handleAnalysis = () => {
    /* Used this for sets: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set */
    const longTermIDs = new Set();
    const mediumTermIDs = new Set();
    const shortTermIDs = new Set();
    const recentIDs = new Set();

    for (let index = 0; index < this.props.longTermTracks.length; index += 1) {
      longTermIDs.add(this.props.longTermTracks[index].id);
    }

    for (let index = 0; index < this.props.mediumTermTracks.length; index += 1) {
      mediumTermIDs.add(this.props.mediumTermTracks[index].id);
    }

    for (let index = 0; index < this.props.shortTermTracks.length; index += 1) {
      shortTermIDs.add(this.props.shortTermTracks[index].id);
    }

    for (let index = 0; index < this.props.recentTracks.length; index += 1) {
      recentIDs.add(this.props.recentTracks[index].track.id);
    }

    this.props.getConsistentFavsTracks(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs);
    this.props.getDeepCutsTracks(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs);
    this.props.getOnRepeatTracks(this.props.token, shortTermIDs, recentIDs);
  }

  handleCreateFavsPlaylist = () => {
    const uris = this.props.consistentFavs.map((track) => {
      return (
        track.uri
      );
    });
    this.props.createPlaylist(this.props.token, this.props.userID, 'Consistent Favorites - Tracks', uris);
    this.setState({
      showModal: true,
    });
  }

  handleCreateDeepCutsPlaylist = () => {
    const uris = this.props.deepCuts.map((track) => {
      return (
        track.uri
      );
    });
    this.props.createPlaylist(this.props.token, this.props.userID, 'Deep Cuts - Tracks', uris);
    this.setState({
      showModal: true,
    });
  }

  handleCreateOnRepeatPlaylist = () => {
    const uris = this.props.onRepeat.map((track) => {
      return (
        track.uri
      );
    });
    this.props.createPlaylist(this.props.token, this.props.userID, 'On Repeat - Tracks', uris);
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  renderConsistentFavorites = () => {
    const tracks = this.props.consistentFavs;

    if (typeof (tracks) === 'undefined') {
      return (<div />);
    }
    const renderedConsistentFavs = tracks.map((track) => {
      return (
        <a key={track.id} href={track.external_urls.spotify} target="_blank" rel="noreferrer">
          <li key={track.id}>
            <img src={track.album.images[0].url} alt="" />
            <div className="itemText">
              <div className="title">{track.name}</div>
              <div className="subtitle">{track.artists[0].name}</div>
            </div>
          </li>
        </a>
      );
    });

    return renderedConsistentFavs;
  }

  renderDeepCuts = () => {
    const tracks = this.props.deepCuts;

    if (typeof (tracks) === 'undefined') {
      return (<div />);
    }
    const renderedDeepCuts = tracks.map((track) => {
      return (
        <a key={track.id} href={track.external_urls.spotify} target="_blank" rel="noreferrer">
          <li key={track.id}>
            <img src={track.album.images[0].url} alt="" />
            <div className="itemText">
              <div className="title">{track.name}</div>
              <div className="subtitle">{track.artists[0].name}</div>
            </div>
          </li>
        </a>
      );
    });

    return renderedDeepCuts;
  }

  renderOnRepeat = () => {
    const tracks = this.props.onRepeat;

    if (typeof (tracks) === 'undefined') {
      return (<div />);
    }
    const renderedOnRepeat = tracks.map((track) => {
      return (
        <a key={track.id} href={track.external_urls.spotify} target="_blank" rel="noreferrer">
          <li key={track.id}>
            <img src={track.album.images[0].url} alt="" />
            <div className="itemText">
              <div className="title">{track.name}</div>
              <div className="subtitle">{track.artists[0].name}</div>
            </div>
          </li>
        </a>
      );
    });

    return renderedOnRepeat;
  }

  /* I used this to figure out how to add the selected class https://www.andreasreiterer.at/dynamically-add-classes/ */
  /* I used this for the modal: https://github.com/reactjs/react-modal */
  render() {
    return (
      <div className="analysisContainer">
        <div className="analysisColumn">
          <h1>Deep Cuts</h1>
          <p>These tracks are in your top tracks of all time, but don&apos;t show up for any other time range.</p>
          <button type="submit" onClick={this.handleCreateDeepCutsPlaylist}>CREATE PLAYLIST</button>
          <ol>
            {this.renderDeepCuts()}
          </ol>
        </div>
        <div className="analysisColumn">
          <h1>On Repeat</h1>
          <p>These tracks are in your top tracks for the past month and in your recent play history.</p>
          <button type="submit" onClick={this.handleCreateOnRepeatPlaylist}>CREATE PLAYLIST</button>
          <ol>
            {this.renderOnRepeat()}
          </ol>
        </div>
        <div className="analysisColumn">
          <h1>Consistent Favorites</h1>
          <p>These tracks are in your top tracks of all time, and from the past 6 months or the past month.</p>
          <button type="submit" onClick={this.handleCreateFavsPlaylist}>CREATE PLAYLIST</button>
          <ol>
            {this.renderConsistentFavorites()}
          </ol>
        </div>
        <div className="modalContainer">
          <Modal className="playlistModal" isOpen={this.state.showModal} ariaHideApp={false}>
            <h1>Created!</h1>
            <img className="loading" src={this.props.playlistImage} alt="" />
            <div className="modalButtons">
              <a href={this.props.playlistLink} target="_blank" rel="noreferrer">
                <button type="button">OPEN PLAYLIST</button>
              </a>
              <button className="closeButton"
                type="button"
                onClick={() => {
                  this.props.clearPlaylist();
                  this.handleCloseModal();
                }}
              >CLOSE
              </button>
            </div>
          </Modal>
        </div>
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
  clearPlaylist,
  createPlaylist,
})(TracksAnalysis);
