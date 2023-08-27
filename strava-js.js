// Strava API endpoints
const AUTHORIZE_URL = 'https://www.strava.com/oauth/authorize';
const TOKEN_URL = 'https://www.strava.com/oauth/token';
const ACTIVITIES_URL = 'https://www.strava.com/api/v3/athlete/activities';

// Application credentials 
const CLIENT_ID = '111503';
const CLIENT_SECRET = '9abdda73b9cf15100b12faefcae56d4c8343a378';

// Request scopes
const SCOPES = 'activity:read_all'; 

// Redirect URI 
const REDIRECT_URI = 'https://berens.co/strava-test';

// Refresh token stored in localStorage
let refreshToken = localStorage.getItem('stravaRefreshToken');

// Get auth code
async function getAuthCode() {

  const authUrl = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;

  window.location = authUrl; // Redirect to auth endpoint

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code'); 

}

// Get access token
async function getAccessToken(code) {

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      refresh_token: refreshToken, 
      scope: SCOPES
    })
  });

  // Get access token and refresh token
  const {access_token, refresh_token} = await response.json();

  // Store new refresh token
  localStorage.setItem('stravaRefreshToken', refresh_token);  

  return access_token;

}


// Fetch activities
async function fetchActivities() {

  const code = await getAuthCode();
  const accessToken = await getAccessToken(code);

  const activities = await fetch(`${ACTIVITIES_URL}?access_token=${accessToken}`);
  const data = await activities.json();

  displayActivity(data[0]); // Display first activity

}

// Initialize app
fetchActivities();