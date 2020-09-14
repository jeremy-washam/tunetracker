import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecentHistory } from '../actions/index';

class Recent extends Component {
  componentDidMount() {
    this.props.fetchRecentHistory(this.props.token);
  }

  renderTracks = () => {
    const renderedTracks = this.props.recent.map((track) => {
      return (
        <li key={track.played_at}>
          <img src={track.track.album.images[0].url} alt="" />
          <div className="itemText">
            <div className="title">{track.track.name}</div>
            <div className="subtitle">
              <p>{track.track.artists[0].name}</p>
              <p>{track.played_at}</p>
            </div>
          </div>
        </li>
      );
    });

    return renderedTracks;
  }

  render() {
    return (
      <div className="main">
        <h1>Your Recently Played Tracks</h1>
        <button type="submit">CREATE PLAYLIST</button>
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
  };
}

export default connect(mapStateToProps, { fetchRecentHistory })(Recent);
