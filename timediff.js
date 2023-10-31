// Get post date element
const postDateEl = document.querySelector('[data-post-date]'); 

// Set post date to current date on load
document.addEventListener('DOMContentLoaded', () => {

  const currentDate = new Date();

  postDateEl.setAttribute('data-post-date', currentDate.toISOString());

});

// Get post date  
const postDate = new Date(postDateEl.getAttribute('data-post-date'));

// Calculate time difference
const timeDiffMs = Date.now() - postDate;
const daysDiff = timeDiffMs / (1000 * 60 * 60 * 24);

// Display time difference 
document.getElementById('timeDifference').textContent = `Time difference: ${daysDiff} days`;