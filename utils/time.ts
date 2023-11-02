export const calculateTime = (time: Date) => {
  const dateTime = new Date(time);

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  let formattedTime = "";

  if (hours === 0) {
    formattedTime += "12:";
  } else if (hours <= 12) {
    formattedTime += hours + ":";
  } else {
    formattedTime += hours - 12 + ":";
  }

  if (minutes < 10) {
    formattedTime += "0";
  }

  formattedTime += minutes;

  if (hours < 12) {
    formattedTime += " AM";
  } else {
    formattedTime += " PM";
  }

  return formattedTime;
};
