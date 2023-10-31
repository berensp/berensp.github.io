document.addEventListener('DOMContentLoaded', () => {

  const postDateEl = document.querySelector('[data-post-date]');
  
  // Set date on load
  const currentDate = new Date();
  postDateEl.setAttribute('data-post-date', currentDate.toISOString());

  // Get date  
  const postDate = new Date(postDateEl.getAttribute('data-post-date'));
  
  // Calculate and display difference
  const diffMs = Date.now() - postDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  document.getElementById('timeDifference').textContent = `Time difference: ${diffDays} days`;

});