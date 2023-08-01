// API endpoint and headers
const endpoint = 'https://api.strava.com/api/v3/activities'; 
const headers = {
  'Authorization': 'Bearer 014add8596df9f6faef9aa632419d8144fccaeb0' 
};

// Fetch activities
async function getRecentActivity() {
  const response = await fetch(endpoint, { headers });
  const activities = await response.json();

  // Get most recent activity
  const recentActivity = activities[0];

  // Extract fields
  const name = recentActivity.name;
  const distance = recentActivity.distance; 
  const date = recentActivity.start_date;

  // Return activity data
  return {
    name,
    distance,
    date
  };
}

// Export data to be used in HTML
export { getRecentActivity };