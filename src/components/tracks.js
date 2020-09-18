import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchLongTermTracks, fetchMediumTermTracks, fetchShortTermTracks, setTracksInfo, fetchUserID, createPlaylist, clearPlaylist,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class Tracks extends Component {
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
  }

  handleLongTerm = () => {
    this.props.setTracksInfo('long_term', 'of All Time', this.props.longTermTracks);
  }

  handleMediumTerm = () => {
    this.props.setTracksInfo('medium_term', 'from the Past 6 Months', this.props.mediumTermTracks);
  }

  handleShortTerm = () => {
    this.props.setTracksInfo('short_term', 'from the Past Month', this.props.shortTermTracks);
  }

  handleCreatePlaylist = () => {
    const uris = this.props.tracks.map((track) => {
      return (
        track.uri
      );
    });
    this.props.createPlaylist(this.props.token, this.props.userID, `Your Top Tracks ${this.props.name}`, uris);
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  renderTracks = () => {
    let tracks = this.props.longTermTracks;
    if (this.props.timerange === 'medium_term') {
      tracks = this.props.mediumTermTracks;
    } else if (this.props.timerange === 'short_term') {
      tracks = this.props.shortTermTracks;
    }

    if (typeof (tracks) === 'undefined') {
      return (<div />);
    }

    const renderedTracks = tracks.map((track) => {
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

    return renderedTracks;
  }

  /* I used this to figure out how to add the selected class https://www.andreasreiterer.at/dynamically-add-classes/ */
  /* I used this for the modal: https://github.com/reactjs/react-modal */
  render() {
    return (
      <div className="main">
        <h1>Your Top Tracks</h1>
        <div className="timeRange">
          <p className={`${this.props.timerange === 'long_term' ? 'selected' : ''}`} onClick={this.handleLongTerm}> All Time </p>
          <p className={`${this.props.timerange === 'medium_term' ? 'selected' : ''}`} onClick={this.handleMediumTerm}> Past 6 Months</p>
          <p className={`${this.props.timerange === 'short_term' ? 'selected' : ''}`} onClick={this.handleShortTerm}> Past Month</p>
        </div>
        <button type="submit" onClick={this.handleCreatePlaylist}>CREATE PLAYLIST</button>
        <ol>
          {this.renderTracks()}
        </ol>
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
    tracks: reduxState.tracks.tracks,
    timerange: reduxState.tracks.timerange,
    name: reduxState.tracks.name,
    userID: reduxState.user.id,
    playlistImage: reduxState.playlist.image,
    playlistLink: reduxState.playlist.link,
  };
}

export default connect(mapStateToProps, {
  fetchLongTermTracks, fetchMediumTermTracks, fetchShortTermTracks, setTracksInfo, fetchUserID, createPlaylist, clearPlaylist,
})(Tracks);
