import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;

function isValidDate(selectedDate) {
  const currentDate = new Date();
  return selectedDate > currentDate;
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function updateTimerInterface(time) {
  const daysElem = document.querySelector('[data-days]');
  const hoursElem = document.querySelector('[data-hours]');
  const minutesElem = document.querySelector('[data-minutes]');
  const secondsElem = document.querySelector('[data-seconds]');

  daysElem.textContent = addLeadingZero(time.days);
  hoursElem.textContent = addLeadingZero(time.hours);
  minutesElem.textContent = addLeadingZero(time.minutes);
  secondsElem.textContent = addLeadingZero(time.seconds);
}

function calculateTimeDifference(selectedDate) {
  const currentTime = new Date();
  const timeDifference = selectedDate - currentTime;

  return convertMs(timeDifference);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function toggleStartButtonState(disabled) {
  const startButton = document.querySelector('[data-start]');
  startButton.disabled = disabled;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (isValidDate(userSelectedDate)) {
      toggleStartButtonState(false);
    } else {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      toggleStartButtonState(true);
    }
  },
};

flatpickr("#datetime-picker", options);

document.querySelector('[data-start]').addEventListener('click', () => {
  
  toggleStartButtonState(true);
  document.getElementById('datetime-picker').disabled = true;

  const timerInterval = setInterval(() => {
    const timeDifference = calculateTimeDifference(userSelectedDate);

    updateTimerInterface(timeDifference);

    if (timeDifference.days === 0 && timeDifference.hours === 0 &&
        timeDifference.minutes === 0 && timeDifference.seconds === 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Countdown Timer',
        message: 'Countdown timer has reached the end!',
      });
    }
  }, 1000);
});
