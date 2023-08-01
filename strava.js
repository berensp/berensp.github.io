// Set access token 
const accessToken = '014add8596df9f6faef9aa632419d8144fccaeb0';

// API endpoint to get activities
const endpoint = 'https://www.strava.com/api/v3/athlete/activities';

// Initialize request object
const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
};

// Make API request
fetch(endpoint, options)
  .then(response => response.json())
  .then(data => {

    // Get most recent activity
    const activities = data;
    const recentActivity = activities[0];

    // Extract relevant fields 
    const name = recentActivity.name; 
    const distance = recentActivity.distance;
    const startDate = recentActivity.start_date;

    // Do something with the data - log, display, etc
    console.log(name, distance, startDate);

  });