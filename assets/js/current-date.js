function updateCurrentDate(elementId) {
  // Get Pacific time
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  const date = new Date(pacificTime);
  
  // Extract timezone abbreviation (PST or PDT)
  const timeZoneAbbr = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles", 
    timeZoneName: "short"
  }).split(' ').pop();
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // ISO 8601 format: YYYY-MM-DD HH:MM with timezone
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${timeZoneAbbr}`;
  document.getElementById(elementId).textContent = formattedDate;
}

document.addEventListener('DOMContentLoaded', function() {
  updateCurrentDate('current-date');
  setInterval(() => updateCurrentDate('current-date'), 60000);
});