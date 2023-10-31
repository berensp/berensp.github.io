document.addEventListener('DOMContentLoaded', () => {

  const postDateEl = document.querySelector('[data-post-date]');

  const currentDate = new Date();

  // Log and validate date
  const isoDate = currentDate.toISOString();
  console.log('ISO Date:', isoDate);

  postDateEl.setAttribute('data-post-date', isoDate);

  // Inspect attribute
  console.log('Element:', postDateEl);

}); 

// Get date
const postDateEl = document.querySelector('[data-post-date]');

// Log attribute value 
const dateStr = postDateEl.getAttribute('data-post-date');
console.log('Date String:', dateStr);

// Parse into date
const postDate = Date.parse(dateStr);

// Validate
if (isNaN(postDate)) {
  console.error('Invalid postDate');
  return;
}

// Log date 
console.log('Post date:', postDate);

// Calculate difference
const diffMs = Date.now() - postDate;
const diffDays = diffMs / (1000 * 60 * 60 * 24); 

// Log difference
console.log('Time difference in days:', diffDays);

// Display difference
const diffEl = document.querySelector('#timeDifference');
diffEl.textContent = `Time difference: ${diffDays} days`;