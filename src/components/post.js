/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faEdit, faSave, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import marked from 'marked';
import { fetchPost, deletePost, updatePost } from '../actions/index';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      rating: '',
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  handleDelete = () => {
    this.props.deletePost(this.props.currentPost.id, this.props.history);
  }

  handleEdit = () => {
    this.setState({
      isEditing: true,
      title: this.props.currentPost.title,
      tags: this.props.currentPost.tags,
      content: this.props.currentPost.content,
      coverUrl: this.props.currentPost.coverUrl,
      rating: this.props.currentPost.rating,
    });
  }

  handleSave = () => {
    this.setState({ isEditing: false });
    this.props.updatePost(this.props.match.params.postID, this.state);
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onTagsChange = (event) => {
    this.setState({ tags: event.target.value });
  }

  onContentChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onCoverUrlChange = (event) => {
    this.setState({ coverUrl: event.target.value });
  }

  onRatingChange = (event) => {
    this.setState({ rating: event.target.value });
  }

  renderEditPost = () => {
    return (
      <div className="postDisplay">
        <div className="fullPost">
          <div className="postLeft">
            <p>Tags:</p>
            <textarea value={this.state.tags} onChange={this.onTagsChange} />
            <p>Cover URL:</p>
            <textarea className="coverInputEdit" value={this.state.coverUrl} onChange={this.onCoverUrlChange} />
            <p>Rating (out of 5 stars):</p>
            <textarea className="ratingInput" value={this.state.rating} onChange={this.onRatingChange} />
          </div>
          <div className="postRight">
            <p>Film title:</p>
            <textarea value={this.state.title} onChange={this.onTitleChange} />
            <p>Review:</p>
            <textarea className="contentInput" value={this.state.content} onChange={this.onContentChange} />
            <div className="editButtons">
              <FontAwesomeIcon className="postIcon" onClick={this.handleSave} icon={faSave} />
              <FontAwesomeIcon className="postIcon" onClick={this.handleDelete} icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPost = () => {
    return (
      <div className="postDisplay">
        <div className="fullPost">
          <div className="postLeft">
            <img src={this.props.currentPost.coverUrl} alt="" />
            <div className="postTags">tags: {this.props.currentPost.tags}</div>
          </div>
          <div className="postRight">
            <div className="postTitle">{this.props.currentPost.title}</div>
            <div className="postRating">
              <StarRatings rating={this.props.currentPost.rating} starRatedColor="gold" starEmptyColor="#9ea3a8" numberOfStars={5} name="rating" starDimension={30} starSpacing={2} />
            </div>
            <div className="postContent" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
            <div className="buttons">
              <Link to="/"><FontAwesomeIcon className="postIcon" icon={faArrowLeft} /></Link>
              <FontAwesomeIcon className="postIcon" onClick={this.handleEdit} icon={faEdit} />
              <FontAwesomeIcon className="postIcon" onClick={this.handleDelete} icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.isEditing) {
      return this.renderEditPost();
    } else {
      return this.renderPost();
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}
// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
