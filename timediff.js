document.addEventListener('DOMContentLoaded', () => {
  const postDateEl = document.querySelector('#postDate');
  
  if (!postDateEl) {
    console.error('Post date element not found');
    return;
  }

  const dateStr = postDateEl.getAttribute('data-post-date');
  const postDate = new Date(dateStr);

  // Log the post date in both local and UTC formats
  console.log("Post Date (local):", postDate.toString());
  console.log("Post Date (UTC):", postDate.toUTCString());

  // Get the current time in Pacific Time
  const currentTime = new Date();
  const timezoneOffset = currentTime.getTimezoneOffset() + 480; // PST is UTC-8 hours
  const pacificTime = new Date(currentTime.getTime() + timezoneOffset * 60000);

  // Log the current time in both local and Pacific Time formats
  console.log("Current Time (local):", currentTime.toString());
  console.log("Current Time (Pacific):", pacificTime.toString());

  // Calculate difference in Pacific Time
  const diffMs = pacificTime - postDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Log the calculated time difference in days
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
