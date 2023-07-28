import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const localStorageKey = 'feedback-form-state';

// Function to save form data to local storage
const saveFormData = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}, 500);

// Function to load and set form data from local storage
const loadAndSetFormData = () => {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

// Event listener to track input changes and save form data
form.addEventListener('input', () => {
  saveFormData();
});

// Event listener to clear form and local storage on submit
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

// Load and set form data on page load
loadAndSetFormData();
