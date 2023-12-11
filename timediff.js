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
  let message = "";

  switch (diffDays) {
    case 0:
      message = "just today";
      break;
    case 1:
      message = "just yesterday";
      break;
    case 2:
      message = "a mere two days ago";
      break;
    case 3:
      message = "a mere three days ago";
      break;
    case 4:
      message = "a mere four days ago";
      break;
    case 5:
      message = "a mere five days ago";
      break;
    case 6:
      message = "a mere six days ago";
      break;
    case 7:
      message = "one week ago today";
      break;
    case 8:
      message = "eight days ago";
      break;
    case 9:
      message = "nine days ago";
      break;
    case 14:
      message = "a fortnight ago";
      break;
    case 21:
      message = "three weeks ago";
      break;
    default:
      message = `a mere ${diffDays} days ago`;
  }

  timeDifferenceEl.textContent = message;
});
