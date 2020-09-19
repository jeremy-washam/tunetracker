import React from 'react';

const About = (props) => {
  return (
    <div className="about">
      <h1>Tune Tracker</h1>
      <h2>Background</h2>
      <p>
        Tune Tracker is a web application that provides access to your Spotify listening data, allowing you gain some insight
        about the artists and tracks that you&apos;ve listened to most often, and how your listening behavior has changed over time.
        It was inspired by Spotify Wrapped - the deep dive into your listening history that Spotify provides at the end of each year.
        I wanted to build something that would provide similar analysis that you can access any time you want.
        To learn more about the project or to view the source code, check out the project repo on
        <a href="https://github.com/dartmouth-cs52-20X/project-tunetracker"> GitHub</a>
      </p>
      <h2>Features</h2>
      <p>
        The application allows you to view your top artists or top tracks over three time ranges: all time, past 6 months, and past month.
        You can also view your 50 most recently played songs, or check out some analysis based on this data
        (for instance, artists that are in your top artists of all time but that you haven&apos;t listened to lately).
        Finally, you can create playlists based on any of this data, or click on any artist or song to open it in Spotify.
      </p>
      <h2>Spotify Access and Privacy</h2>
      <p>
        The application requires a Spotify account and accesses your Spotify account to read your top tracks, top artists,
        and recent history, and to create new playlists. The application is client side only, so none of your data or account
        information is stored. If you logged in with the wrong account or want to switch accounts, just refresh the page and login again.
      </p>
    </div>
  );
};

export default About;
