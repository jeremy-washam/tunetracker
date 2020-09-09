import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchPosts } from '../actions/index';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts = () => {
    const posts = this.props.posts.map((post) => {
      return (
        <li key={post.id}>
          <div className="post">
            <NavLink to={`posts/${post.id}`} exact>
              <div className="image"><img src={post.coverUrl} alt="" /></div>
              <div className="title">{post.title}</div>
              <div className="tags">{post.tags}</div>
            </NavLink>
          </div>
        </li>
      );
    });
    return posts;
  }

  render() {
    return (
      <div>
        <div className="welcome">Check out movie reviews below, or add a review of your own! </div>
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

export default connect(mapStateToProps, { fetchPosts })(Posts);
