import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchTracks, fetchUserID, createPlaylist,
} from '../actions/index';

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLongTerm: true,
      isMediumTerm: false,
      isShortTerm: false,
      name: 'Your Top 50 Tracks: All Time',
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchTracks(this.props.token, 'long_term');
  }

  handleLongTerm = () => {
    this.props.fetchTracks(this.props.token, 'long_term');
    this.setState({
      isLongTerm: true,
      isMediumTerm: false,
      isShortTerm: false,
      name: 'Your Top 50 Tracks of All Time',
    });
  }

  handleMediumTerm = () => {
    this.props.fetchTracks(this.props.token, 'medium_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: true,
      isShortTerm: false,
      name: 'Your Top 50 Tracks from the Past 6 Months',
    });
  }

  handleShortTerm = () => {
    this.props.fetchTracks(this.props.token, 'short_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: false,
      isShortTerm: true,
      name: 'Your Top 50 Tracks from the Past Month',
    });
  }

  handleCreatePlaylist = () => {
    const uris = this.props.tracks.map((track) => {
      return (
        track.uri
      );
    });
    this.props.createPlaylist(this.props.token, this.props.userID, this.state.name, uris);
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
          <p className={`${this.state.isLongTerm ? 'selected' : ''}`} onClick={this.handleLongTerm}> All Time </p>
          <p className={`${this.state.isMediumTerm ? 'selected' : ''}`} onClick={this.handleMediumTerm}> Past 6 Months</p>
          <p className={`${this.state.isShortTerm ? 'selected' : ''}`} onClick={this.handleShortTerm}> Past Month</p>
        </div>
        <button type="submit" onClick={this.handleCreatePlaylist}>CREATE PLAYLIST</button>
        <ol>
          {this.renderTracks()}
        </ol>
        <Modal isOpen={this.state.showModal}>
          <button type="button" onClick={this.handleCloseModal}>Close Modal</button>
          <img src={this.props.playlistURL} alt="" />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    tracks: reduxState.tracks.items,
    userID: reduxState.user.id,
    playlistURL: reduxState.playlist.url,
  };
}

export default connect(mapStateToProps, {
  fetchTracks, fetchUserID, createPlaylist,
})(Tracks);
