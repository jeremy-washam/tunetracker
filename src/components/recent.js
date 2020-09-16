import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchRecentHistory, fetchUserID, createPlaylist } from '../actions/index';

class Recent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChronological: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserID(this.props.token);
    this.props.fetchRecentHistory(this.props.token);
  }

  handleMostRecent = () => {
    this.props.fetchRecentHistory(this.props.token);
    this.setState({
      isChronological: false,
    });
  }

  handleChronological = () => {
    this.props.fetchRecentHistory(this.props.token);
    this.setState({
      isChronological: true,
    });
  }

  handleCreatePlaylist = () => {
    const date = moment().format('MMMM YYYY');
    const name = `Your Recently Played Tracks: ${date}`;
    const uris = this.props.recent.map((track) => {
      return (
        track.track.uri
      );
    });

    this.props.createPlaylist(this.props.token, this.props.userID, name, uris);
  }

  renderTracks = () => {
    if (this.state.isChronological === true) {
      this.props.recent.reverse();
    }

    console.log(this.props.recent);

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
          <p className={`${this.state.isChronological ? '' : 'selected'}`} onClick={this.handleMostRecent}>Most Recent</p>
          <p className={`${this.state.isChronological ? 'selected' : ''}`} onClick={this.handleChronological}>Chronological</p>
        </div>
        <button type="submit" onClick={this.handleCreatePlaylist}>CREATE PLAYLIST</button>
        <ul>
          {this.renderTracks()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    recent: reduxState.recent.items,
    userID: reduxState.user.id,
  };
}

export default connect(mapStateToProps, { fetchRecentHistory, fetchUserID, createPlaylist })(Recent);
