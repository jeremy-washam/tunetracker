import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formError: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSignIn = () => {
    const { email } = this.state;
    const { password } = this.state;

    if (email === '' || password === '') {
      this.setState({ formError: true });
    } else {
      this.props.signinUser({ email, password }, this.props.history);
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
          <p className="authTitle">Sign In</p>
          <p>Email address:</p>
          <textarea value={this.state.email} onChange={this.onEmailChange} />
          <p>Password:</p>
          <textarea value={this.state.password} onChange={this.onPasswordChange} />
          <FontAwesomeIcon className="authIcon" onClick={this.handleSignIn} icon={faSignInAlt} />
          {this.renderErrorMessage()}
        </div>
      </div>

    );
  }
}

export default connect(null, { signinUser })(SignIn);
