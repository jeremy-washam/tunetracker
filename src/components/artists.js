import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtists } from '../actions/index';

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
    this.props.fetchArtists(this.props.token, 'long_term');
  }

  handleLongTerm = () => {
    this.props.fetchArtists(this.props.token, 'long_term');
    this.setState({
      isLongTerm: true,
      isMediumTerm: false,
      isShortTerm: false,
    });
    console.log(this.props.artists);
  }

  handleMediumTerm = () => {
    this.props.fetchArtists(this.props.token, 'medium_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: true,
      isShortTerm: false,
    });
    console.log(this.props.artists);
  }

  handleShortTerm = () => {
    this.props.fetchArtists(this.props.token, 'short_term');
    this.setState({
      isLongTerm: false,
      isMediumTerm: false,
      isShortTerm: true,
    });
    console.log(this.props.artists);
  }

  renderArtists = () => {
    const renderedArtists = this.props.artists.map((artist) => {
      return (
        <li key={artist.id}>
          <img src={artist.images[0].url} alt="" />
          <div className="itemText">
            <div className="title">{artist.name}</div>
            <div className="subtitle">{artist.genres}</div>
          </div>
        </li>
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
        <button type="submit">CREATE PLAYLIST</button>
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
  };
}

export default connect(mapStateToProps, { fetchArtists })(Artists);
