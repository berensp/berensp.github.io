document.addEventListener('DOMContentLoaded', () => {
  const postDateEl = document.querySelector('#postDate');
  
  if (!postDateEl) {
    console.error('Post date element not found');
    return;
  }

  const dateStr = postDateEl.getAttribute('data-post-date');
  const postDate = new Date(dateStr);

  // Calculate and display difference
  const diffMs = Date.now() - postDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  const timeDifferenceEl = document.getElementById('timeDifference');
  
  if (!timeDifferenceEl) {
    console.error('Time difference element not found');
    return;
  }

  timeDifferenceEl.textContent = `Time difference: ${diffDays.toFixed(2)} days`;
});
