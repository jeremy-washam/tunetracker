import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';
import {
  fetchRecentHistory, fetchUserID, createPlaylist, clearPlaylist, setRecentOrder,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class Recent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchRecentHistory(this.props.token);
  }

  handleMostRecent = () => {
    this.props.fetchRecentHistory(this.props.token);
    this.props.setRecentOrder(false);
  }

  handleChronological = () => {
    this.props.fetchRecentHistory(this.props.token);
    this.props.setRecentOrder(true);
  }

  handleCreatePlaylist = () => {
    const date = moment().format('MMMM YYYY');
    const name = `Your Recently Played Tracks from ${date}`;
    const uris = this.props.recent.map((track) => {
      return (
        track.track.uri
      );
    });

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

  renderTracks = () => {
    if (this.props.isChronological === true) {
      this.props.recent.reverse();
    }

    const renderedTracks = this.props.recent.map((track) => {
      return (
        <a key={track.played_at} href={track.track.external_urls.spotify} target="_blank" rel="noreferrer">
          <li key={track.played_at}>
            <img src={track.track.album.images[0].url} alt="" />
            <div className="itemText">
              <div className="title">{track.track.name}</div>
              <div className="subtitle">
                <p>{track.track.artists[0].name}</p>
                <p>{moment(track.played_at).format('MMM DD, h:mma')}</p>
              </div>
            </div>
          </li>
        </a>
      );
    });
    return renderedTracks;
  }

  render() {
    return (
      <div className="main">
        <h1>Your Recently Played Tracks</h1>
        <div className="timeRange">
          <p className={`${this.props.isChronological ? '' : 'selected'}`} onClick={this.handleMostRecent}>Most Recent</p>
          <p className={`${this.props.isChronological ? 'selected' : ''}`} onClick={this.handleChronological}>Chronological</p>
        </div>
        <button type="submit" onClick={this.handleCreatePlaylist}>CREATE PLAYLIST</button>
        <ul>
          {this.renderTracks()}
        </ul>
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
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    isChronological: reduxState.filter.isChronological,
    recent: reduxState.recent.items,
    userID: reduxState.user.id,
    playlistImage: reduxState.playlist.image,
    playlistLink: reduxState.playlist.link,
  };
}

export default connect(mapStateToProps, {
  fetchRecentHistory, fetchUserID, createPlaylist, clearPlaylist, setRecentOrder,
})(Recent);
