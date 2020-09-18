import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart, faHistory, faStar, faMusic, faHeadphonesAlt,
} from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => {
  return (
    <nav>
      <NavLink className="navLink" exact to="/">
        <div className="siteName">
          <img id="navLogo" src="https://i.ibb.co/3sj1KnH/tune.png" alt="" />
        </div>
      </NavLink>
      <NavLink className="navLink" to="/artists">
        <FontAwesomeIcon icon={faStar} />
        <p>Top Artists</p>
      </NavLink>
      <NavLink className="navLink" to="/tracks">
        <FontAwesomeIcon icon={faHeart} />
        <p>Top Tracks</p>
      </NavLink>
      <NavLink className="navLink" to="/recent">
        <FontAwesomeIcon icon={faHistory} />
        <p>Recent Tracks</p>
      </NavLink>
      <NavLink className="navLink" to="/artistsanalysis">
        <FontAwesomeIcon icon={faMusic} />
        <p>Artists Analysis</p>
      </NavLink>
      <NavLink className="navLink" to="/tracksanalysis">
        <FontAwesomeIcon icon={faHeadphonesAlt} />
        <p>Tracks Analysis</p>
      </NavLink>
    </nav>
  );
};

export default Nav;
