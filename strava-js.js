// Strava API endpoints
const AUTHORIZE_URL = 'https://www.strava.com/oauth/authorize';
const TOKEN_URL = 'https://www.strava.com/oauth/token';
const ACTIVITIES_URL = 'https://www.strava.com/api/v3/athlete/activities'; 

// Client ID and secret from Strava API registration
const CLIENT_ID = '111503';
const CLIENT_SECRET = '9abdda73b9cf15100b12faefcae56d4c8343a378';

// Saved refresh token 
let refreshToken = 'your_refresh_token'; 

// Request scopes from Strava API
const SCOPES = 'activity:read';

async function fetchActivities() {

  // Get access token
  const accessToken = await getAccessToken();
  
  // Use access token to call Strava API
  const activities = await fetch(ACTIVITIES_URL + '?access_token=' + accessToken)
    .then(res => res.json());

  // Display first activity
  displayActivity(activities[0]);

}

async function getAccessToken() {

  // Request access token using refresh token
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      scope: SCOPES
    })
  });
  
  // Extract access token 
  const data = await response.json();
  return data.access_token;

}

function displayActivity(activity) {

  // Display activity data
  document.getElementById('activity').innerHTML = `
    <h2>${activity.name}</h2>  
    <p><strong>Distance:</strong> ${activity.distance} m</p>
    <p><strong>Moving Time:</strong> ${activity.moving_time} s</p>
  `;

}

// Initialize
fetchActivities();