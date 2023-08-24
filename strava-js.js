// Strava API endpoint and access token 
const API_URL = 'https://www.strava.com/api/v3/athlete/activities';
const ACCESS_TOKEN = 'af63396fd41d863bda24d3a645233012693fb576';

// Fetch latest activity
fetch(API_URL + '?per_page=1&access_token=' + ACCESS_TOKEN)
  .then(response => response.json())
  .then(data => {

    // Get the first/latest activity
    const activity = data[0];

    // Display activity data    
    document.getElementById('activity').innerHTML = `
      <h2>${activity.name}</h2>
      <p><strong>Distance:</strong> ${activity.distance} m</p>
      <p><strong>Moving Time:</strong> ${activity.moving_time} s</p>
    `;

  })
  .catch(error => console.error(error));