import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchTracks, fetchUserID, createPlaylist, setTrackTimerange, clearPlaylist,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'of All Time',
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchTracks(this.props.token, this.props.timerange);
  }

  handleLongTerm = () => {
    this.props.setTrackTimerange('long_term');
    this.props.fetchTracks(this.props.token, 'long_term');
    this.setState({
      name: 'of All Time',
    });
  }

  handleMediumTerm = () => {
    this.props.setTrackTimerange('medium_term');
    this.props.fetchTracks(this.props.token, 'medium_term');
    this.setState({
      name: 'from the Past 6 Months',
    });
  }

  handleShortTerm = () => {
    this.props.setTrackTimerange('short_term');
    this.props.fetchTracks(this.props.token, 'short_term');
    this.setState({
      name: 'from the Past Month',
    });
  }

  handleCreatePlaylist = () => {
    const uris = this.props.tracks.map((track) => {
      return (
        track.uri
      );
    });
    console.log(uris);
    this.props.createPlaylist(this.props.token, this.props.userID, `Your Top Tracks ${this.state.name}`, uris);
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
    const renderedTracks = this.props.tracks.map((track) => {
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
            <h1>Created! Your Top Tracks {this.state.name}</h1>
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
    timerange: reduxState.filter.trackTimerange,
    tracks: reduxState.tracks.items,
    userID: reduxState.user.id,
    playlistImage: reduxState.playlist.image,
    playlistLink: reduxState.playlist.link,
  };
}

export default connect(mapStateToProps, {
  fetchTracks, fetchUserID, createPlaylist, setTrackTimerange, clearPlaylist,
})(Tracks);
