document.addEventListener('DOMContentLoaded', () => {
  const postDateEl = document.querySelector('#postDate');
  
  if (!postDateEl) {
    console.error('Post date element not found');
    return;
  }

  // Ensure the date string is in the correct format (e.g., 'YYYY-MM-DD')
  const dateStr = postDateEl.getAttribute('data-post-date');
  const adjustedDateStr = dateStr + 'T12:00:00-08:00';
  console.log("Adjusted Date String:", adjustedDateStr);

  const postDate = new Date(adjustedDateStr);

  // Check if the date is valid
  if (isNaN(postDate)) {
    console.error('Invalid post date:', adjustedDateStr);
    return;
  }

  console.log("Calculated Post Date (PST):", postDate.toString());

  const currentTime = new Date();
  console.log("Current Time (local):", currentTime.toString());

  const diffMs = currentTime - postDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  console.log("Difference in days:", diffDays);

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
      message = "a mere eight days ago";
      break;
    case 9:
      message = "a mere nine days ago";
      break;
    default:
      message = `a mere ${diffDays} days ago`;
  }

  timeDifferenceEl.textContent = message;
});
