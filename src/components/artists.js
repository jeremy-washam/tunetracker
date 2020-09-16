/* eslint-disable quotes */
/* eslint-disable quote-props */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Spotify from 'spotify-web-api-js';
import { fetchArtists, fetchUserID } from '../actions/index';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLongTerm: true,
      isMediumTerm: false,
      isShortTerm: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchArtists(this.props.token, 'long_term');
  }

  handleLongTerm = () => {
    this.props.fetchArtists(this.props.token, 'long_term');
    this.setState({
      isLongTerm: true,
      isMediumTerm: false,
      isShortTerm: false,
    });
  }

  handleMediumTerm = () => {
    this.props.fetchArtists(this.props.token, 'medium_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: true,
      isShortTerm: false,
    });
  }

  handleShortTerm = () => {
    this.props.fetchArtists(this.props.token, 'short_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: false,
      isShortTerm: true,
    });
  }

  /* Used this to test whether image is undefined:
  https://codeburst.io/uncaught-typeerror-cannot-read-property-of-undefined-in-javascript-c81e00f4a5e3 */
  renderArtists = () => {
    /* Figure this stuff out
    const SpotifyAPI = new Spotify();
    SpotifyAPI.setAccessToken(this.props.token);

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
    console.log(this.props.artists);
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
          <p className={`${this.state.isLongTerm ? 'selected' : ''}`} onClick={this.handleLongTerm}> All Time </p>
          <p className={`${this.state.isMediumTerm ? 'selected' : ''}`} onClick={this.handleMediumTerm}> Past 6 Months</p>
          <p className={`${this.state.isShortTerm ? 'selected' : ''}`} onClick={this.handleShortTerm}> Past Month</p>
        </div>
        <button type="submit" onClick={this.handleCreatePlaylist}>CREATE PLAYLIST</button>
        <ol>
          {this.renderArtists()}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    artists: reduxState.artists.items,
    userID: reduxState.user.id,
  };
}

export default connect(mapStateToProps, { fetchArtists, fetchUserID })(Artists);
