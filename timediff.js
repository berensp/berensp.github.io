document.addEventListener('DOMContentLoaded', () => {

  const postDateEl = document.querySelector('[data-post-date]');

  const currentDate = new Date();

  // Validate date format
  const isoDate = currentDate.toISOString();

  if (!isoDate.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/)) {
    console.error('Invalid ISO date:', isoDate);
    throw new Error('Invalid date format'); 
  }

  postDateEl.setAttribute('data-post-date', isoDate);

});

// Get date 
const postDateEl = document.querySelector('[data-post-date]');

const dateStr = postDateEl.getAttribute('data-post-date');

// Parse date 
const postDate = Date.parse(dateStr);

// Handle invalid date
if (isNaN(postDate)) {
  console.error('Invalid date:', dateStr);
  postDate = new Date(0); // default to Jan 1, 1970
}

// Calculate and display difference
const diffMs = Date.now() - postDate;
const diffDays = diffMs / (1000 * 60 * 60 * 24);

document.getElementById('timeDifference').textContent = `Time difference: ${diffDays.toFixed(2)} days`;