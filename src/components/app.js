import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Posts from './posts';
import Post from './post';
import NewPost from './newpost';
import Nav from './nav';
import SignUp from './signup';
import SignIn from './signin';
import PrivateRoute from './privateroute';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <PrivateRoute path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route render={() => (<div className="pnf">Post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
