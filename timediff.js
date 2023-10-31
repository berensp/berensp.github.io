// Get post date element 
const postDateEl = document.querySelector('[data-post-date]');

// Date math logic
const postDate = new Date(postDateEl.getAttribute('data-post-date'));
const timeDiffMs = Date.now() - postDate;
const daysDiff = timeDiffMs / (1000 * 60 * 60 * 24);

// Display time difference
document.getElementById('timeDifference').textContent = `Time difference: ${daysDiff} days`;