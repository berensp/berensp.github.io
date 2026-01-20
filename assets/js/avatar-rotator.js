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

  // Get day of week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Select avatar based on day of week
  const selectedAvatar = avatarsByDay[dayOfWeek];
  
  // Update the image source
  avatarEl.src = `/assets/images/avatars/pmb.${selectedAvatar}.png`;
});