import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchLongTermArtists, fetchMediumTermArtists, fetchShortTermArtists, setArtistsInfo, fetchUserID, clearPlaylist, createArtistPlaylist,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchLongTermArtists(this.props.token);
    this.props.fetchMediumTermArtists(this.props.token);
    this.props.fetchShortTermArtists(this.props.token);

    setTimeout(() => {
      if (this.props.timerange === 'long_term') {
        this.handleLongTerm();
      }
      if (this.props.timerange === 'medium_term') {
        this.handleMediumTerm();
      }
      if (this.props.timerange === 'short_term') {
        this.handleShortTerm();
      }
    }, 2000);
  }

  handleLongTerm = () => {
    this.props.setArtistsInfo('long_term', 'of All Time', this.props.longTermArtists);
  }

  handleMediumTerm = () => {
    this.props.setArtistsInfo('medium_term', 'from the Past 6 Months', this.props.mediumTermArtists);
  }

  handleShortTerm = () => {
    this.props.setArtistsInfo('short_term', 'from the Past Month', this.props.shortTermArtists);
  }

  handleCreatePlaylist = () => {
    this.props.createArtistPlaylist(this.props.token, this.props.userID, `Your Top Artists ${this.props.name}`, this.props.artists);
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
    let artists = this.props.longTermArtists;
    if (this.props.timerange === 'medium_term') {
      artists = this.props.mediumTermArtists;
    } else if (this.props.timerange === 'short_term') {
      artists = this.props.shortTermArtists;
    }

    if (typeof (artists) === 'undefined') {
      return (<div />);
    }

    const renderedArtists = artists.map((artist) => {
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
    longTermArtists: reduxState.artists.longTerm,
    mediumTermArtists: reduxState.artists.mediumTerm,
    shortTermArtists: reduxState.artists.shortTerm,
    artists: reduxState.artists.artists,
    timerange: reduxState.artists.timerange,
    name: reduxState.artists.name,
    userID: reduxState.user.id,
    playlistImage: reduxState.playlist.image,
    playlistLink: reduxState.playlist.link,
  };
}

export default connect(mapStateToProps, {
  fetchLongTermArtists, fetchMediumTermArtists, fetchShortTermArtists, setArtistsInfo, fetchUserID, clearPlaylist, createArtistPlaylist,
})(Artists);
