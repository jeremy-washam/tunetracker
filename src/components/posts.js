import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import { fetchPosts, fetchPostsByRating } from '../actions/index';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterByRating: false,
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleFilterByRating = () => {
    this.props.fetchPostsByRating();
    this.setState({ filterByRating: true });
  }

  handleFilterByDate = () => {
    this.props.fetchPosts();
    this.setState({ filterByRating: false });
  }

  renderPosts = () => {
    const posts = this.props.posts.map((post) => {
      return (
        <li key={post.id}>
          <div className="post">
            <NavLink to={`posts/${post.id}`} exact>
              <div className="image"><img src={post.coverUrl} alt="" /></div>
              <div className="title">{post.title}</div>
              <div className="rating">
                <StarRatings rating={post.rating} starRatedColor="gold" starEmptyColor="#68747f" numberOfStars={5} name="rating" starDimension={20} starSpacing={2} />
              </div>
              <div className="tags">{post.tags}</div>
            </NavLink>
          </div>
        </li>
      );
    });
    return posts;
  }

  /* I used this to figure out how to add the selected class https://www.andreasreiterer.at/dynamically-add-classes/ */
  render() {
    return (
      <div>
        <div className="filter">
          <p>Sort by: </p>
          <p className={`filterItem ${this.state.filterByRating ? '' : 'selected'}`} onClick={this.handleFilterByDate}> Most Recent </p>
          <p className={`filterItem ${this.state.filterByRating ? 'selected' : ''}`} onClick={this.handleFilterByRating}> Top Rated</p>
        </div>
        <ul className="posts">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts.all,
  };
}

export default connect(mapStateToProps, { fetchPosts, fetchPostsByRating })(Posts);
