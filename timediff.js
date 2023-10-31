document.addEventListener('DOMContentLoaded', () => {

  const postDateEl = document.querySelector('[data-post-date]');

  // Set date on load
  const currentDate = new Date(); 
  postDateEl.setAttribute('data-post-date', currentDate.toISOString());
  
  // Log date
  console.log('Set postDate:', currentDate); 

});

// Get date
const postDateEl = document.querySelector('[data-post-date]');
const postDate = new Date(postDateEl.getAttribute('data-post-date'));

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