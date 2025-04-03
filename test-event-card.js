// Test script to simulate different time scenarios for EventCard

// Function to simulate the EventCard logic
function simulateEventCard(now, eventDate) {
  // Calculate event end time (3 hours after start)
  const eventEndDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

  const isUpcoming = now < eventDate;
  const isInProgress = now >= eventDate && now <= eventEndDate;
  const isToday = now.getDate() === eventDate.getDate() && 
      now.getMonth() === eventDate.getMonth() && 
      now.getFullYear() === eventDate.getFullYear();

  // Determine the display message
  let message;
  if (isInProgress) {
    message = "🎉 Live now! Why aren't you here?";
  } else if (isToday && isUpcoming) {
    message = "🎯 Today! (upcoming)";
  } else if (isUpcoming) {
    message = "Upcoming (not today)";
  } else {
    message = "Event ended";
  }

  // Determine the border style
  let borderStyle;
  if (isInProgress) {
    borderStyle = "border-2 border-purple dark:border-green";
  } else if (isToday && !isInProgress) {
    borderStyle = "border-2 border-yellow-500 dark:border-yellow-400";
  } else {
    borderStyle = "no special border";
  }

  return {
    isUpcoming,
    isInProgress,
    isToday,
    message,
    borderStyle
  };
}

// Current date (for reference)
const currentDate = new Date("2025-04-03T11:59:07+02:00");
console.log("Current date:", currentDate.toLocaleString());

// Scenario 1: Event is today but hasn't started yet
const todayFutureEvent = new Date(currentDate);
todayFutureEvent.setHours(14, 0, 0); // Today at 2 PM
console.log("\nScenario 1: Event is today but hasn't started yet (Today at 2 PM)");
console.log(simulateEventCard(currentDate, todayFutureEvent));

// Scenario 2: Event is today and in progress
const todayInProgressEvent = new Date(currentDate);
todayInProgressEvent.setHours(11, 0, 0); // Today at 11 AM (started 59 minutes ago)
console.log("\nScenario 2: Event is today and in progress (Today at 11 AM)");
console.log(simulateEventCard(currentDate, todayInProgressEvent));

// Scenario 3: Event is in the future (not today)
const futureDateEvent = new Date(currentDate);
futureDateEvent.setDate(futureDateEvent.getDate() + 1); // Tomorrow
futureDateEvent.setHours(14, 0, 0); // Tomorrow at 2 PM
console.log("\nScenario 3: Event is in the future (Tomorrow at 2 PM)");
console.log(simulateEventCard(currentDate, futureDateEvent));

// Scenario 4: Event is in the past
const pastDateEvent = new Date(currentDate);
pastDateEvent.setDate(pastDateEvent.getDate() - 1); // Yesterday
pastDateEvent.setHours(14, 0, 0); // Yesterday at 2 PM
console.log("\nScenario 4: Event is in the past (Yesterday at 2 PM)");
console.log(simulateEventCard(currentDate, pastDateEvent));
