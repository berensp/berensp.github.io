// On load
document.addEventListener('DOMContentLoaded', () => {

  const postDateEl = document.querySelector('[data-post-date]');

  const currentDate = new Date();
  
  // Validate date format
  const isoDate = currentDate.toISOString();
  if (!isoDate.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/)) {
    console.error('Invalid ISO date:', isoDate);
    return;
  }  

  postDateEl.setAttribute('data-post-date', isoDate);

});

// Get date
const postDateEl = document.querySelector('[data-post-date]');

const dateStr = postDateEl.getAttribute('data-post-date');

// Log full date string 
console.log(dateStr);

// Parse date
const postDate = Date.parse(dateStr);

// Check for invalid date
if (isNaN(postDate)) {
  console.error('Invalid date:', dateStr);
  return; 
}

console.log('Parsed date:', postDate); 

// Calculate difference
const diffMs = Date.now() - postDate;
const diffDays = diffMs / (1000 * 60 * 60 * 24);

console.log('Difference in days:', diffDays);

// Display difference
const diffEl = document.querySelector('#timeDifference');
diffEl.textContent = `Time difference: ${diffDays} days`;