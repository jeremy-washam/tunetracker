import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  authEndpoint, clientId, redirectUri, scopes,
} from './config';
import hash from './hash';

/* I found this here: https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition */
import ScrollToTop from './scrolltotop';

import About from './about';
import Artists from './artists';
import Tracks from './tracks';
import Recent from './recent';
import Nav from './nav';

/* Based on this: https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }

  componentDidMount() {
    // Set token
    const _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
    }
  }

  /* Used this to pass token to child components:
  https://dev.to/halented/passing-state-to-components-rendered-by-react-router-and-other-fun-things-3pjf */
  render() {
    return (
      <div className="App">
        {!this.state.token && (
        <div className="loginPage">
          <h1>Tune Tracker</h1>
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              '%20',
            )}&response_type=token&show_dialog=true`}
          >
            Sign in with Spotify
          </a>
        </div>
        )}
        {this.state.token && (
          <Router>
            <ScrollToTop>
              <Nav />
              <Switch>
                <Route exact path="/" component={About} />
                <Route path="/artists"
                  render={(props) => (<Artists token={this.state.token} />)}
                />
                <Route path="/tracks"
                  render={(props) => (<Tracks token={this.state.token} />)}
                />
                <Route path="/recent"
                  render={(props) => (<Recent token={this.state.token} />)}
                />
                <Route component={About} />
              </Switch>
            </ScrollToTop>
          </Router>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(mapStateToProps)(App);
