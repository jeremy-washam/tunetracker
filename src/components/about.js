import React from 'react';

const About = (props) => {
  return (
    <div className="about">
      <h1>Tune Tracker</h1>
      <p>
        Tune Tracker is a web application that provides access to your Spotify listening data,
        allowing you to view your top artists or top tracks from the past month, past 6 months, or all-time.
        You can also view your 50 most recently played songs, and create playlists based on any of this data.
      </p>
      <h2>Background</h2>
      <p>
        This application was built by Jeremy Washam as a final project for CS52 (Web Development) at Dartmouth College.
        For more info about the project or to view the source code, check it out on
        <a href="https://github.com/dartmouth-cs52-20X/project-tunetracker"> GitHub</a>
      </p>
      <h2>Spotify Access and Scopes</h2>
      <p>
        The application requires access to your Spotify account, and requires several scopes to access specific Spotify API endpoints.
        The scopes that are required are:
      </p>
      <ul>
        <li>user-read-recently-played</li>
        <li>user-top-read</li>
        <li>playlist-modify-public</li>
      </ul>
      <p>For more info about the Spotify API and scopes, check out their docs <a href="https://developer.spotify.com/documentation/web-api/"> here</a>
      </p>
    </div>
  );
};

export default About;
