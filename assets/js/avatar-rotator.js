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

  // Get Pacific time (matching current-date.js approach)
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  const date = new Date(pacificTime);
  
  // Calculate day of year in Pacific time
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  
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