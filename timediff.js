document.addEventListener('DOMContentLoaded', () => {

  const postDateEl = document.querySelector('[data-post-date]');
  
  const currentDate = new Date();

  // Validate ISO format  
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/; 
  const isoDate = currentDate.toISOString();

  if (!isoDate.match(isoRegex)) {
    console.error('Invalid ISO date:', isoDate);
    throw new Error('Invalid ISO date format');
  }

  postDateEl.setAttribute('data-post-date', isoDate);

});

// Get date
const postDateEl = document.querySelector('[data-post-date]');

const dateStr = postDateEl.getAttribute('data-post-date');

// Check for valid ISO format
if (!dateStr.match(isoRegex)) {
  console.error('Invalid ISO date:', dateStr);
  return;
}

// Parse date
let postDate = Date.parse(dateStr); 

// Handle invalid date 
if (isNaN(postDate)) {
  console.error('Invalid date:', dateStr);
  postDate = new Date(0); 
}

// Calculate and display difference
const diffMs = Date.now() - postDate;
const diffDays = diffMs / (1000 * 60 * 60 * 24);

document.getElementById('timeDifference').textContent = `Time difference: ${diffDays.toFixed(2)} days`;