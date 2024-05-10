export default function unixConverter(string) {

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const today = new Date().getDay();
  const now = new Date().getTime();
  let unixTime = null;

  let editedString = string.replace(":", ' ')
  console.log(editedString);
  let array = editedString.split(" ");
  console.log(array);

  if (array.length == 4) {
    if (array[1] == "h") {
      console.log("Hours format")
      const hours = parseInt(array[0]);
      const minutes = parseInt(array[2]);
      console.log(hours + " hours " + minutes + " minutes")
      unixTime = now + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
      console.log(unixTime)

    
    }

    else if (array[1] == "m") {
      console.log("Minutes format")
      const minutes = parseInt(array[0]);
      const seconds = parseInt(array[2]);
      console.log(minutes + " minutes " + seconds + " seconds");
      unixTime = now + (minutes * 60 * 1000) + (seconds * 1000);
      console.log(unixTime)


    }

    else {
      console.log("Date format")
      const day = parseInt(array[0]);
      const month = array[1];
      const hours = parseInt(array[2]);
      const minutes = parseInt(array[3]);
      const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
      const yearDiff = monthIndex - thisMonth;
      if (yearDiff >= 0) {
        const futureDate = new Date(thisYear, monthIndex, day, hours, minutes);
        unixTime = futureDate.getTime();
        console.log(unixTime)

      }
      else {
        const futureDate = new Date(thisYear + Math.abs(yearDiff), monthIndex, day, hours, minutes);
        unixTime = futureDate.getTime();
        console.log(unixTime)

      }

    }
  }

  else if (array.length == 3) {
    console.log("Day format");
    const dayOfWeek = array[0];
    const hours = array[1];
    const minutes = array[2];
    const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(dayOfWeek);
    const dayDiff = (dayIndex - today + 7) % 7;
    if (dayDiff == 0) {
      const futureDate = new Date(now + 604800000);
      futureDate.setHours(hours);
      futureDate.setMinutes(minutes);
      unixTime = futureDate.getTime();
      console.log(unixTime);

    }
    else {
      const futureDate = new Date(now + (dayDiff * 24 * 60 * 60 * 1000));
      futureDate.setHours(hours);
      futureDate.setMinutes(minutes);
      unixTime = futureDate.getTime();
      console.log(unixTime);

    }
  }

  else if (array.length == 2){
    console.log("Seconds format")
    const seconds = parseInt(array[0]);
    console.log(seconds + " seconds")
    unixTime = now + (seconds * 1000);
    console.log(unixTime)

  }
  return unixTime
}
// const dateFormat = "10 May 20:10";
// const daysFormat = "Fri 10:00";
// const hoursFormat = "1 h 48 m";
// const minutesFormat = "15 m 60 s";
// const secondsFormat = "15 s";

// unixConverter(hoursFormat)