// _assets/js/date_calculator.js

/**
 * Calculate Easter Sunday for a given year using the Meeus/Jones/Butcher algorithm
 * @param {number} year - The year to calculate Easter for
 * @return {Date} Easter Sunday date
 */
function calculateEaster(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-based month
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month, day);
}

/**
 * Calculate the nth weekday of a month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @param {number} dayOfWeek - Day of week (0-6, where 0 is Sunday)
 * @param {number} n - Which occurrence (1-5 for first-fifth, negative for last/second-to-last/etc.)
 * @return {Date} The calculated date
 */
function getNthDayOfMonth(year, month, dayOfWeek, n) {
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();
  
  let dayOfMonth = 1 + (dayOfWeek - firstDayOfWeek + 7) % 7;
  
  // If n is negative, calculate from the end of the month
  if (n < 0) {
    const lastDay = new Date(year, month + 1, 0).getDate();
    let lastOccurrence = dayOfMonth;
    
    // Find the last occurrence of this day in the month
    while (lastOccurrence + 7 <= lastDay) {
      lastOccurrence += 7;
    }
    
    // Count back from the last occurrence
    // n = -1 means last, n = -2 means second-to-last, etc.
    const targetOccurrence = lastOccurrence + (n + 1) * 7;
    
    return new Date(year, month, targetOccurrence);
  } else {
    // Positive n: calculate from the beginning of the month
    // If n is 5 or greater, find the last occurrence (legacy behavior)
    if (n >= 5) {
      const lastDay = new Date(year, month + 1, 0).getDate();
      let lastOccurrence = dayOfMonth;
      
      while (lastOccurrence + 7 <= lastDay) {
        lastOccurrence += 7;
      }
      
      return new Date(year, month, lastOccurrence);
    } else {
      // Adjust to the nth occurrence
      dayOfMonth += (n - 1) * 7;
      return new Date(year, month, dayOfMonth);
    }
  }
}

/**
 * Calculate Election Day (Tuesday after first Monday in November)
 * @param {number} year - The year to calculate for
 * @return {Date} Election Day date
 */
function calculateElectionDay(year) {
  // Find the first Monday in November
  const firstMonday = getNthDayOfMonth(year, 10, 1, 1); // Month 10 = November, day 1 = Monday
  
  // Election Day is the next day (Tuesday)
  const electionDay = new Date(firstMonday);
  electionDay.setDate(firstMonday.getDate() + 1);
  
  return electionDay;
}

/**
 * Parse a rule and calculate the actual date
 * @param {string} rule - The rule string (e.g., "easter-40", "first-monday-september")
 * @param {number} year - The year to calculate for
 * @return {Date|null} The calculated date or null if rule is invalid
 */
function calculateDateFromRule(rule, year) {
  // Election Day (special case)
  if (rule === "first-tuesday-november-after-first-monday") {
    return calculateElectionDay(year);
  }
  
  // Easter-based rules
  if (rule.startsWith('easter')) {
    const easterDate = calculateEaster(year);
    const match = rule.match(/easter([+-])(\d+)/);
    
    if (match) {
      const operator = match[1];
      const days = parseInt(match[2]);
      const msPerDay = 24 * 60 * 60 * 1000;
      
      return new Date(
        easterDate.getTime() + (operator === '+' ? days : -days) * msPerDay
      );
    }
    
    return easterDate; // Just Easter itself
  }
  
  // Nth day of month rules (e.g., "first-monday-september")
  const nthDayMatch = rule.match(/^(first|second|third|fourth|fifth|last|second-to-last|third-to-last)-(sunday|monday|tuesday|wednesday|thursday|friday|saturday)-(january|february|march|april|may|june|july|august|september|october|november|december)$/);
  
  if (nthDayMatch) {
    const ordinals = {
      'first': 1,
      'second': 2,
      'third': 3,
      'fourth': 4,
      'fifth': 5,
      'last': -1,        // Negative numbers indicate "from the end"
      'second-to-last': -2,
      'third-to-last': -3
    };
    
    const days = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6
    };
    
    const months = {
      'january': 0,
      'february': 1,
      'march': 2,
      'april': 3,
      'may': 4,
      'june': 5,
      'july': 6,
      'august': 7,
      'september': 8,
      'october': 9,
      'november': 10,
      'december': 11
    };
    
    const n = ordinals[nthDayMatch[1]];
    const dayOfWeek = days[nthDayMatch[2]];
    const month = months[nthDayMatch[3]];
    
    return getNthDayOfMonth(year, month, dayOfWeek, n);
  }
  
  return null; // Invalid rule
}

/**
 * Format date as MM-DD string (e.g., "12-25" for December 25)
 * @param {Date} date - The date to format
 * @return {string} Formatted date string
 */
function formatDateMMDD(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}