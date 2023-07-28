import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const localStorageKey = 'feedback-form-state';


const saveFormData = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}, 500);


const loadAndSetFormData = () => {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};


form.addEventListener('input', () => {
  saveFormData();
});


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formData);
  localStorage.removeItem(localStorageKey);
  emailInput.value = '';
  messageTextarea.value = '';
});


loadAndSetFormData();
