// /assets/js/avatar-rotator.js

document.addEventListener('DOMContentLoaded', () => {
  const avatarEl = document.getElementById('rotating-avatar');
  if (!avatarEl) return;

  // Avatar by day of week (0 = Sunday, 1 = Monday, etc.)
  const avatarsByDay = {
    0: 'ski',        // Sunday
    1: 'commuter',   // Monday
    2: 'explorer',   // Tuesday
    3: 'slingbag',   // Wednesday
    4: 'ratpack',    // Thursday
    5: 'farout',     // Friday
    6: 'hiker'       // Saturday
  };

  // Get Pacific time (matching current-date.js approach exactly)
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  const date = new Date(pacificTime);
  
  // Log exact times for debugging
  console.log("Local Time:", new Date().toString());
  console.log("Pacific Time String:", pacificTime);
  console.log("Parsed Date:", date.toString());
  
  // Get day of week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = date.getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  console.log("Day of Week:", dayNames[dayOfWeek]);
  
  // Select avatar based on day of week
  const selectedAvatar = avatarsByDay[dayOfWeek];
  
  // Calculate tomorrow's avatar
  const tomorrowDayOfWeek = (dayOfWeek + 1) % 7;
  const tomorrowAvatar = avatarsByDay[tomorrowDayOfWeek];
  
  console.log("Today's Avatar:", selectedAvatar, `(${dayNames[dayOfWeek]})`);
  console.log("Tomorrow's Avatar:", tomorrowAvatar, `(${dayNames[tomorrowDayOfWeek]})`);
  console.log("Weekly schedule:", avatarsByDay);
  
  // Update the image source
  avatarEl.src = `/assets/images/avatars/pmb.${selectedAvatar}.png`;
});