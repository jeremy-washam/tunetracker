import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      formError: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSignUp = () => {
    const { email } = this.state;
    const { password } = this.state;
    const { username } = this.state;

    console.log(username);

    if (email === '' || username === '' || password === '') {
      this.setState({ formError: true });
    } else {
      this.props.signupUser({ email, username, password }, this.props.history);
    }
  }

  renderErrorMessage = () => {
    if (this.state.formError === true) {
      return (<p className="errorMessage">Error: fill out each form!</p>);
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div className="postDisplay">
        <div className="authDisplay">
          <p className="authTitle">Sign Up</p>
          <p>Email address:</p>
          <textarea value={this.state.email} onChange={this.onEmailChange} />
          <p>Username:</p>
          <textarea value={this.state.username} onChange={this.onUsernameChange} />
          <p>Password:</p>
          <textarea value={this.state.password} onChange={this.onPasswordChange} />
          <FontAwesomeIcon className="authIcon" onClick={this.handleSignUp} icon={faUserCheck} />
          {this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

export default connect(null, { signupUser })(SignUp);
