import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.form');
  form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
  event.preventDefault();

  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const state = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      showNotification(`✅ Fulfilled promise in ${delay}ms`, 'success');
    })
    .catch((delay) => {
      showNotification(`❌ Rejected promise in ${delay}ms`, 'error');
    });
}

function showNotification(message, type) {
  iziToast[type]({
    title: 'Notification',
    message: message,
    position: 'topRight',
    timeout: 5000, 
});
}
