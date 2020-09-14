/* I found this here: https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6 */

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = 'd22d86a92731467a80dea67e666db488';
export const redirectUri = 'http://localhost:8080/redirect';
export const scopes = [
  'user-top-read',
  'user-read-recently-played',
];
