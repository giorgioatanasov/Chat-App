export function getDisplayTime(sentDate) {
  let dateFormat = require("dateformat");
  let sentTime = new Date(sentDate);
  let endTime = new Date(); // Compute time difference in milliseconds
  let timeDiff = endTime.getTime() - sentTime.getTime();
  let elapsedTime = timeDiff / 1000; // Convert time difference from milliseconds to seconds
  if (elapsedTime > 86400) {
    // if the message is greater than 1 day we display in format: Month Day, Year at 6:21 AM/PM
    return `${dateFormat(sentTime, "mmmm d, yyyy")} at ${dateFormat(
      sentTime,
      "h:MM TT"
    )}`;
  } else {
    return dateFormat(sentTime, "h:MM TT");
  }
}

export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
