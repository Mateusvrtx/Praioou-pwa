// dark mode

document.addEventListener('DOMContentLoaded', () => {
  // Verifica a preferência armazenada no localStorage
  const darkMode = localStorage.getItem('darkMode') === 'true';

  if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      updateImages(true);
  } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      updateImages(false);
  }
});

let count = 0;

const counterElement = document.getElementById('counter');

function updateCounter() {
  counterElement.textContent = count;
}

function increment() {
  count++;
  updateCounter();
}

function decrement() {
  if (count > 0) {
    count--;
    updateCounter();
  }
}

