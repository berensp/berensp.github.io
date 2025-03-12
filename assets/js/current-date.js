function updateCurrentDate(elementId) {
  // Get Pacific time
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  const date = new Date(pacificTime);
  
  // Extract timezone abbreviation (PST or PDT)
  const timeZoneAbbr = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles", 
    timeZoneName: "short"
  }).split(' ').pop();
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // Include timezone abbreviation in the formatted date
  const formattedDate = `${day} ${month}, ${hours}:${minutes} ${timeZoneAbbr}`;
  document.getElementById(elementId).textContent = formattedDate;
}

document.addEventListener('DOMContentLoaded', function() {
  updateCurrentDate('current-date');
  setInterval(() => updateCurrentDate('current-date'), 60000);
});