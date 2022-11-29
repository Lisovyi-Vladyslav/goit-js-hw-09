import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const form = document.querySelector(".form");

function createPromise(position, delays) {
   return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delays });
      } else {
        reject({ position, delays });
      }
    }, delays);
  })
}

form.addEventListener("submit", event => {
event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);
  let delays = delayValue;
  
  
  for (let position = 1; position < amountValue; position++) {
    
     const timerId = setTimeout(() => {
       console.log(delays);
       
      createPromise(position, delays)
        .then(({ position, delays }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delays}ms`, { position: 'center-center' });
        })
        .catch(({ position, delays }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delays}ms`, { position: 'center-center' });
        });
    
    delays += stepValue;
    
  }, stepValue); 
  }
 
});




//   const refs = {
//   modal: document.querySelector('#subscription-modal'),
//   subscribeBtn: document.querySelector('button[data-subscribe]'),
// };
// const PROMPT_DELAY = 3000;
// const MAX_PROMPT_ATTEMPTS = 3;
// let promptCounter = 0;
// let hasSubscribed = false;
// const modal = new BSN.Modal('#subscription-modal');

// openModal();

// refs.modal.addEventListener('hide.bs.modal', openModal);
// refs.subscribeBtn.addEventListener('click', onSubscribeBtnClick);

// function openModal() {
//   if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
//     console.log('Максимальное кол-во надоеданий или подписался');
//     return;
//   }

//   setTimeout(() => {
//     console.log('Открываем надоедалку');
//     modal.show();
//     promptCounter += 1;
//   }, PROMPT_DELAY);
// }

// function onSubscribeBtnClick() {
//   hasSubscribed = true;
//   modal.hide();
// }