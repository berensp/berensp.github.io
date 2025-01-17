function updateCurrentDate(elementId) {
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  const date = new Date(pacificTime);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  const formattedDate = `${day} ${month}, ${hours}:${minutes}`;
  document.getElementById(elementId).textContent = formattedDate;
}

document.addEventListener('DOMContentLoaded', function() {
  updateCurrentDate('current-date');
  setInterval(() => updateCurrentDate('current-date'), 60000);
});