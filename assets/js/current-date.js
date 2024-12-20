function updateCurrentDate(elementId) {
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  const date = new Date(pacificTime);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const year = date.getFullYear();
  
  const formattedDate = `${day} ${month}, ${hours}:${minutes}`;
  document.getElementById(elementId).textContent = formattedDate;
  
  // Debug logging for footer year update
  const footerYearElements = document.querySelectorAll('.footer-year');
  footerYearElements.forEach(element => {
    console.log("Footer year before:", element.textContent);
    element.textContent = year;
    console.log("Footer year after:", element.textContent);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Initial update
  updateCurrentDate('current-date');
  
  // Update every minute (60000 milliseconds)
  setInterval(() => {
    updateCurrentDate('current-date');
  }, 60000);
});