import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions/index';

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLongTerm: true,
      isMediumTerm: false,
      isShortTerm: false,
    };
  }

  componentDidMount() {
    this.props.fetchTracks(this.props.token, 'long_term');
  }

  handleLongTerm = () => {
    this.props.fetchTracks(this.props.token, 'long_term');
    this.setState({
      isLongTerm: true,
      isMediumTerm: false,
      isShortTerm: false,
    });
  }

  handleMediumTerm = () => {
    this.props.fetchTracks(this.props.token, 'medium_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: true,
      isShortTerm: false,
    });
  }

  handleShortTerm = () => {
    this.props.fetchTracks(this.props.token, 'short_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: false,
      isShortTerm: true,
    });
  }

  renderTracks = () => {
    const renderedTracks = this.props.tracks.map((track) => {
      return (
        <li key={track.id}>
          <img src={track.album.images[0].url} alt="" />
          <div className="itemText">
            <div className="title">{track.name}</div>
            <div className="subtitle">{track.artists[0].name}</div>
          </div>
        </li>
      );
    });

    return renderedTracks;
  }

  /* I used this to figure out how to add the selected class https://www.andreasreiterer.at/dynamically-add-classes/ */
  render() {
    return (
      <div className="main">
        <h1>Your Top Tracks</h1>
        <div className="timeRange">
          <p className={`${this.state.isLongTerm ? 'selected' : ''}`} onClick={this.handleLongTerm}> All Time </p>
          <p className={`${this.state.isMediumTerm ? 'selected' : ''}`} onClick={this.handleMediumTerm}> Past 6 Months</p>
          <p className={`${this.state.isShortTerm ? 'selected' : ''}`} onClick={this.handleShortTerm}> Past Month</p>
        </div>
        <button type="submit">CREATE PLAYLIST</button>
        <ol>
          {this.renderTracks()}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    tracks: reduxState.tracks.items,
  };
}

export default connect(mapStateToProps, { fetchTracks })(Tracks);
