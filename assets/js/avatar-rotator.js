// /assets/js/avatar-rotator.js

document.addEventListener('DOMContentLoaded', () => {
  const avatarEl = document.getElementById('rotating-avatar');
  if (!avatarEl) return;

  // List of avatar filenames
  const avatars = [
    'cartoon.nb',
    'commuter',
    'daddio',
    'explorer',
    'farout',
    'hiker',
    'library',
    'nakamigo',
    'neckerchief',
    'newfriend',
    'ratpack',
    'revolution',
    'ski',
    'slingbag',
    'smokin',
    'vc'
  ];

  // Get Pacific time (matching current-date.js approach exactly)
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  const date = new Date(pacificTime);
  
  // Log exact times for debugging
  console.log("Local Time:", new Date().toString());
  console.log("Pacific Time String:", pacificTime);
  console.log("Parsed Date:", date.toString());
  
  // Calculate day of year using the same Pacific date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const startOfYear = new Date(year, 0, 1);
  const currentDate = new Date(year, month, day);
  const dayOfYear = Math.floor((currentDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  
  console.log("Pacific Date:", date.toDateString());
  console.log("Day of Year (Pacific):", dayOfYear);
  
  // Select avatar based on day of year
  const index = dayOfYear % avatars.length;
  const selectedAvatar = avatars[index];
  
  // Calculate tomorrow's avatar
  const tomorrowIndex = (dayOfYear + 1) % avatars.length;
  const tomorrowAvatar = avatars[tomorrowIndex];
  
  console.log("Today's Avatar:", selectedAvatar, `(#${index + 1} of ${avatars.length})`);
  console.log("Tomorrow's Avatar:", tomorrowAvatar, `(#${tomorrowIndex + 1} of ${avatars.length})`);
  console.log("Full rotation schedule:", avatars);
  
  // Update the image source
  avatarEl.src = `/assets/images/avatars/pmb.${selectedAvatar}.png`;
});