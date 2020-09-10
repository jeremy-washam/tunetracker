import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faSave, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import { createPost } from '../actions/index';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      title: '',
      content: '',
      coverUrl: '',
      tags: '',
      rating: '',
    };
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

  onCoverChange = (event) => {
    this.setState({ coverUrl: event.target.value });
  }

  onRatingChange = (event) => {
    this.setState({ rating: event.target.value });
  }

  handleDelete = () => {
    this.props.history.push('/');
  }

  handleSave = () => {
    if (this.state.title === '' || this.state.content === '' || this.state.coverUrl === '' || this.state.tags === '' || this.state.rating > 5 || this.state.rating < 0) {
      this.setState({ formError: true });
    } else {
      this.props.createPost(this.state, this.props.history);
    }
  }

  renderErrorMessage = () => {
    if (this.state.formError === true) {
      return (<p className="errorMessage">Fill out each form, and make sure rating is between 0 and 5!</p>);
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div className="postDisplay">
        <div className="fullPost">
          <div className="postLeft">
            <p>Tags:</p>
            <textarea value={this.state.tags} onChange={this.onTagsChange} />
            <p>Cover URL:</p>
            <textarea className="coverInput" value={this.state.coverUrl} onChange={this.onCoverChange} />
            <p>Rating (out of 5 stars):</p>
            <textarea className="ratingInput" value={this.state.rating} onChange={this.onRatingChange} />
            {this.renderErrorMessage()}
          </div>
          <div className="postRight">
            <p>Film title:</p>
            <textarea value={this.state.title} onChange={this.onTitleChange} />
            <p>Review:</p>
            <textarea className="contentInput" value={this.state.content} onChange={this.onContentChange} />
            <div className="editButtons">
              <Link to="/"><FontAwesomeIcon className="postIcon" icon={faArrowLeft} /></Link>
              <FontAwesomeIcon className="postIcon" onClick={this.handleSave} icon={faSave} />
              <FontAwesomeIcon className="postIcon" onClick={this.handleDelete} icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(NewPost);
