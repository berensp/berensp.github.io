// Strava API endpoints
const STRAVA_API = {
  AUTHORIZE_URL: 'https://www.strava.com/oauth/authorize',
  TOKEN_URL: 'https://www.strava.com/oauth/token',
  ACTIVITIES_URL: 'https://www.strava.com/api/v3/athlete/activities'
};

// Application credentials
const CLIENT_CREDENTIALS = {
  CLIENT_ID: '111503',
  CLIENT_SECRET: '9abdda73b9cf15100b12faefcae56d4c8343a378'
};

// Request scopes
const SCOPES = 'activity:read_all';

// Redirect URI
const REDIRECT_URI = encodeURIComponent('/callback.html');


// Refresh token stored in localStorage
let refreshToken = localStorage.getItem('stravaRefreshToken');

// Function to open authorization window
function openAuthWindow(authUrl) {
  return new Promise((resolve) => {
    const popup = window.open(authUrl, 'authWindow', 'width=500,height=600');
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}

// Get auth code
async function getAuthCode() {
  const authUrl = `${STRAVA_API.AUTHORIZE_URL}?client_id=${CLIENT_CREDENTIALS.CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;
  await openAuthWindow(authUrl);
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
}

// Get access token
async function getAccessToken(code) {
  const response = await fetch(STRAVA_API.TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...CLIENT_CREDENTIALS,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    })
  });
  const { access_token, refresh_token } = await response.json();
  localStorage.setItem('stravaRefreshToken', refresh_token);
  return access_token;
}

// Fetch activities
async function fetchActivities() {
  try {
    const code = await getAuthCode();
    const accessToken = await getAccessToken(code);
    const activitiesResponse = await fetch(`${STRAVA_API.ACTIVITIES_URL}?access_token=${accessToken}`);
    const activitiesData = await activitiesResponse.json();
    displayActivity(activitiesData[0]); // Display first activity
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
}

// Initialize app
fetchActivities();
