// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// оголошую елементи
const refs = {

  startBtn: document.querySelector('[data-start]'),
    timeDay: document.querySelector('[data-days]'),
    timeHours: document.querySelector('[data-hours]'),
    timeMinutes: document.querySelector('[data-minutes]'),
    timeSeconds: document.querySelector('[data-seconds]'),
  
};
let timerDeadline = 0;
refs.startBtn.disabled = true;

// подія початок
refs.startBtn.addEventListener('click', startTimer);

// функція для початку
function startTimer() {
    timer.start();
}


const timer = {
  intervalId: null,
// початок таймеру
  start() {
    refs.startBtn.disabled = true;
      
    const saleTime = timerDeadline;
    
    this.intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime =  saleTime - currentTime;
    const time = convertMs(deltaTime);

        updateClockface(time);

         if (deltaTime <= 0) {
      clearInterval(timerId);
      return;
    }
    }, 1000);
    },

}


  function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
  
  function pad(value) {
    return String(value).padStart(2, '0');
  }

// оновлення інтерфейсу
function updateClockface({ days, hours, minutes, seconds }) {
    refs.timeDay.textContent = `${days}`;
    refs.timeHours.textContent = `${hours}`;
    refs.timeMinutes.textContent = `${minutes}`;
    refs.timeSeconds.textContent = `${seconds}`;
}

// налаштування до дати
 const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
   onClose(selectedDates) {
    
    // console.log(selectedDates[0]);
    timerDeadline = selectedDates[0].getTime();
    // console.log(timerDeadline);
    if (timerDeadline < Date.now()) {
        window.alert('Please choose a date in the future'); 
    } else {
        refs.startBtn.disabled = false;
      }
  },
};
// визначення дати
flatpickr("#datetime-picker", options);

