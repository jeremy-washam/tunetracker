import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTh, faFilm, faPlus, faSignOutAlt, faUserCheck, faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { signoutUser } from '../actions/index';

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

const renderAuth = (authenticated, signout, history) => {
  if (authenticated) {
    return (
      <ul>
        <li>
          <NavLink className="navlink" exact to="/">
            <FontAwesomeIcon className="icon" icon={faTh} />
            All Reviews
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" to="/posts/new">
            <FontAwesomeIcon className="icon" icon={faPlus} />
            Add a Review
          </NavLink>
        </li>
        <li>
          <button type="submit" className="signoutLink" onClick={() => signout(history)}>
            <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
            Sign Out
          </button>
        </li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>
          <NavLink className="navlink" exact to="/">
            <FontAwesomeIcon className="icon" icon={faTh} />
            All Reviews
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" exact to="/signup">
            <FontAwesomeIcon className="icon" icon={faUserCheck} />
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" exact to="/signin">
            <FontAwesomeIcon className="icon" icon={faSignInAlt} />
            Sign In
          </NavLink>
        </li>
      </ul>
    );
  }
};

const Nav = (props) => {
  return (
    <nav>
      <div className="navleft">
        <FontAwesomeIcon className="icon" icon={faFilm} />
        <p>FilmFinder</p>
      </div>
      {renderAuth(props.authenticated, props.signoutUser, props.history)}
    </nav>
  );
};

export default connect(mapStateToProps, { signoutUser })(Nav);
