document.addEventListener('DOMContentLoaded', () => {

  // Get element
  const postDateEl = document.querySelector('[data-post-date]');

  // Set date 
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  console.log('Setting date to:', isoDate);

  postDateEl.setAttribute('data-post-date', isoDate);

  console.log('Element:', postDateEl);

});

// Get date 
const postDateEl = document.querySelector('[data-post-date]');

// Log attribute value
const dateStr = postDateEl.getAttribute('data-post-date');
console.log('Date string:', dateStr);

// Parse into Date object
const postDate = Date.parse(dateStr);

// Validate
if (isNaN(postDate)) {

  console.error('Invalid postDate:', dateStr);
  
  throw new Error('Invalid date string');

}

console.log('Parsed date:', postDate); 

// Calculate difference
const diffMs = Date.now() - postDate;
const diffDays = diffMs / (1000 * 60 * 60 * 24);

console.log('Difference in days:', diffDays);

// Display difference
const diffEl = document.querySelector('#timeDifference');
diffEl.textContent = `Time difference: ${diffDays} days`;