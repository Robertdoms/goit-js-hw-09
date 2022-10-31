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
}
