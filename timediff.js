document.addEventListener('DOMContentLoaded', () => {
  const postDateEl = document.querySelector('#postDate');
  
  if (!postDateEl) {
    console.error('Post date element not found');
    return;
  }

  // Extracting only the date part from dateStr
  // Assuming dateStr is in the format 'YYYY-MM-DDTHH:MM:SSZ'
  const datePart = postDateEl.getAttribute('data-post-date').split('T')[0];
  const adjustedDateStr = datePart + 'T10:00:00-08:00'; // Set to 10:00 PST
  console.log("Adjusted Date String:", adjustedDateStr);

  const postDate = new Date(adjustedDateStr);

  if (isNaN(postDate.getTime())) {
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
      message = "several days ago";
      break;
    case 4:
      message = "a mere four days ago";
      break;
    case 5:
      message = "a mere five days ago";
      break;
    case 6:
      message = "a half dozen days ago";
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
