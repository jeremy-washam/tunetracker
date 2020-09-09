import React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTh, faFilm, faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => {
  return (
    <nav>
      <div className="navleft">
        <FontAwesomeIcon className="icon" icon={faFilm} />
        <p>Film Finder</p>
      </div>
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
      </ul>
    </nav>
  );
};

export default Nav;
