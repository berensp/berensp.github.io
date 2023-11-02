document.addEventListener('DOMContentLoaded', () => {
  const postDateEl = document.querySelector('#postDate');
  
  if (!postDateEl) {
    console.error('Post date element not found');
    return;
  }

  const dateStr = postDateEl.getAttribute('data-post-date');
  const postDate = new Date(dateStr);

  // Calculate and display difference in UTC
  const diffMs = Date.now() - postDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const timeDifferenceEl = document.getElementById('timeDifferenceInline');
  
  if (!timeDifferenceEl) {
    console.error('Time difference element not found');
    return;
  }

  // Update the content of the 'timeDifferenceInline' element based on the time difference
  let message = `a mere ${diffDays} days ago`;
  if (diffDays === 0) {
    message = "just today";
  } else if (diffDays === 1) {
    message = "just yesterday";
  }

  timeDifferenceEl.textContent = message;
});
