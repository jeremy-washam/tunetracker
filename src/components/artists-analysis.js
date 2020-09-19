import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchShortTermArtists, fetchMediumTermArtists, fetchLongTermArtists, getConsistentFavsArtists, getDeepCutsArtists, getOnRepeatArtists,
  fetchUserID, clearPlaylist, createArtistPlaylist,
} from '../actions/index';

/* Changing the style in CSS didn't work for some reason so I did this instead */
/* Found this on the README for the react-modal library that I used */
Modal.defaultStyles.overlay.backgroundColor = 'rgba(50, 50, 50, 0.75)';

class ArtistsAnalysis extends Component {
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
    const longTermIDs = new Set();
    const mediumTermIDs = new Set();
    const shortTermIDs = new Set();

    for (let index = 0; index < this.props.longTermArtists.length; index += 1) {
      longTermIDs.add(this.props.longTermArtists[index].id);
    }

    for (let index = 0; index < this.props.mediumTermArtists.length; index += 1) {
      mediumTermIDs.add(this.props.mediumTermArtists[index].id);
    }

    for (let index = 0; index < this.props.shortTermArtists.length; index += 1) {
      shortTermIDs.add(this.props.shortTermArtists[index].id);
    }

    this.props.getConsistentFavsArtists(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs);
    this.props.getDeepCutsArtists(this.props.token, longTermIDs, mediumTermIDs, shortTermIDs);
    this.props.getOnRepeatArtists(this.props.token, mediumTermIDs, shortTermIDs);
  }

  handleCreateFavsPlaylist = () => {
    this.props.createArtistPlaylist(this.props.token, this.props.userID, 'Consistent Favorites - Artists', this.props.consistentFavs);
    this.setState({
      showModal: true,
    });
  }

  handleCreateDeepCutsPlaylist = () => {
    this.props.createArtistPlaylist(this.props.token, this.props.userID, 'Deep Cuts - Artists', this.props.deepCuts);
    this.setState({
      showModal: true,
    });
  }

  handleCreateOnRepeatPlaylist = () => {
    this.props.createArtistPlaylist(this.props.token, this.props.userID, 'On Repeat - Artists', this.props.onRepeat);
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
    const artists = this.props.consistentFavs;

    if (typeof (artists) === 'undefined') {
      return (<div />);
    }
    const renderedConsistentFavs = artists.map((artist) => {
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
            </div>
          </li>
        </a>
      );
    });

    return renderedConsistentFavs;
  }

  renderDeepCuts = () => {
    const artists = this.props.deepCuts;

    if (typeof (artists) === 'undefined') {
      return (<div />);
    }
    const renderedDeepCuts = artists.map((artist) => {
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
            </div>
          </li>
        </a>
      );
    });

    return renderedDeepCuts;
  }

  renderOnRepeat = () => {
    const artists = this.props.onRepeat;

    if (typeof (artists) === 'undefined') {
      return (<div />);
    }
    const renderedOnRepeat = artists.map((artist) => {
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
            </div>
          </li>
        </a>
      );
    });

    return renderedOnRepeat;
  }

  render() {
    return (
      <div className="analysisContainer">
        <div className="analysisColumn">
          <h1>Deep Cuts</h1>
          <p>These artists are in your top artists of all time, but don&apos;t show up for any other time range.</p>
          <button type="submit" onClick={this.handleCreateDeepCutsPlaylist}>CREATE PLAYLIST</button>
          <ol>
            {this.renderDeepCuts()}
          </ol>
        </div>
        <div className="analysisColumn">
          <h1>On Repeat</h1>
          <p>These artists are in your top artists for both the past month and the past 6 months.</p>
          <button type="submit" onClick={this.handleCreateOnRepeatPlaylist}>CREATE PLAYLIST</button>

          <ol>
            {this.renderOnRepeat()}
          </ol>
        </div>
        <div className="analysisColumn">
          <h1>Consistent Favorites</h1>
          <p>These artists are in your top artists of all time, as well as in your top artists from the past 6 months.</p>
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
  clearPlaylist,
  createArtistPlaylist,
})(ArtistsAnalysis);
