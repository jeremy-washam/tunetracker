/* eslint-disable quotes */
/* eslint-disable quote-props */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
// import Spotify from 'spotify-web-api-js';
import {
  fetchArtists, fetchUserID, setArtistTimerange, clearPlaylist, createArtistPlaylist,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'of All Time',
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchArtists(this.props.token, this.props.timerange);
  }

  handleLongTerm = () => {
    this.props.setArtistTimerange('long_term');
    this.props.fetchArtists(this.props.token, 'long_term');
    this.setState({
      name: 'of All Time',
    });
  }

  handleMediumTerm = () => {
    this.props.setArtistTimerange('medium_term');
    this.props.fetchArtists(this.props.token, 'medium_term');
    this.setState({
      name: 'from the Past 6 Months',
    });
  }

  handleShortTerm = () => {
    this.props.setArtistTimerange('short_term');
    this.props.fetchArtists(this.props.token, 'short_term');
    this.setState({
      name: 'from the Past Month',
    });
  }

  handleCreatePlaylist = () => {
    /* const ids = this.props.artists.map((artist) => {
      return (
        artist.id
      );
    });

    const SpotifyAPI = new Spotify();
    SpotifyAPI.setAccessToken(this.props.token);

    const uris = [];

    for (let index = 0; index < 20; index += 1) {
      SpotifyAPI.getArtistTopTracks(ids[index], 'US').then((response) => {
        for (let index2 = 0; index2 < 5; index2 += 1) {
          uris.push(response.tracks[index2].uri);
        }
      });
    }

    console.log(uris);
    */

    this.props.createArtistPlaylist(this.props.token, this.props.userID, `Your Top Artists ${this.state.name}`, this.props.artists);

    /* Figure this stuff out
    const ids = this.props.artists.map((artist) => {
      return (
        artist.id
      );
    });

    SpotifyAPI.getArtistTopTracks(ids, 'US').then((data) => {
      console.log(data);
    });

    const topTracks = ids.map((id) => {
      return (

      );
    });
    console.log(topTracks);
    */

    /* const uris = this.props.tracks.map((track) => {
      return (
        track.uri
      );
    });
    this.props.createPlaylist(this.props.token, this.props.userID, `Your Top Tracks ${this.state.name}`, uris);
    */

    this.setState({
      showModal: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  /* Used this to test whether image is undefined:
  https://codeburst.io/uncaught-typeerror-cannot-read-property-of-undefined-in-javascript-c81e00f4a5e3 */
  renderArtists = () => {
    const renderedArtists = this.props.artists.map((artist) => {
      return (
        <a key={artist.id} href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
          <li key={artist.id}>
            <img src={typeof (artist.images[0]) === 'undefined'
              ? 'https://i1.wp.com/fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg?fit=900%2C900&ssl=1&w=640'
              : artist.images[0].url}
              alt=""
            />
            <div className="itemText">
              <div className="title">{artist.name}</div>
              <div className="subtitle">{artist.genres.slice(0, 5).join(', ')}</div>
            </div>
          </li>
        </a>
      );
    });

    return renderedArtists;
  }

  /* I used this to figure out how to add the selected class https://www.andreasreiterer.at/dynamically-add-classes/ */
  render() {
    return (
      <div className="main">
        <h1>Your Top Artists</h1>
        <div className="timeRange">
          <p className={`${this.props.timerange === 'long_term' ? 'selected' : ''}`} onClick={this.handleLongTerm}> All Time </p>
          <p className={`${this.props.timerange === 'medium_term' ? 'selected' : ''}`} onClick={this.handleMediumTerm}> Past 6 Months</p>
          <p className={`${this.props.timerange === 'short_term' ? 'selected' : ''}`} onClick={this.handleShortTerm}> Past Month</p>
        </div>
        <button type="submit" onClick={this.handleCreatePlaylist}>CREATE PLAYLIST</button>
        <ol>
          {this.renderArtists()}
        </ol>
        <div className="modalContainer">
          <Modal className="playlistModal" isOpen={this.state.showModal} ariaHideApp={false}>
            <h1>Created! Your Top Artists {this.state.name}</h1>
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
    timerange: reduxState.filter.artistTimerange,
    artists: reduxState.artists.items,
    userID: reduxState.user.id,
    playlistImage: reduxState.playlist.image,
    playlistLink: reduxState.playlist.link,
  };
}

export default connect(mapStateToProps, {
  fetchArtists, fetchUserID, setArtistTimerange, clearPlaylist, createArtistPlaylist,
})(Artists);
