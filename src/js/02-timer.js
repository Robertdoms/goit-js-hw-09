import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timerInput: document.querySelector('input#datetime-picker'),
  timerStartBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('.value[data-days]'),
  timerHours: document.querySelector('.value[data-hours]'),
  timerMinutes: document.querySelector('.value[data-minutes]'),
  timerSeconds: document.querySelector('.value[data-seconds]'),
};

const currentTime = new Date();

refs.timerStartBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentTime) {
      Notify.warning('Please choose a date in the  future');
    } else {
      refs.timerStartBtn.disabled = false;
    }
  },
};
refs.timerStartBtn.addEventListener('click', onStartBtnClick);
flatpickr(refs.timerInput, options);

let timerId = null;
function onStartBtnClick() {
  const inputDate = new Date(refs.timerInput.value);

  refs.timerStartBtn.disabled = true;

  timerId = setInterval(() => {
    const timeSubtraction = inputDate - new Date();
    const time = convertMs(timeSubtraction);
    console.log(convertMs(timeSubtraction));
    updateTextComponent(time);
    if (timeSubtraction < 1000) {
      clearInterval(timerId);
      Notify.info('Time is up');
    }
  }, 1000);
}

function updateTextComponent({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMinutes.textContent = minutes;
  refs.timerSeconds.textContent = seconds;
}

refs.timerStartBtn.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
    const day = hour * 24;
    
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
}
