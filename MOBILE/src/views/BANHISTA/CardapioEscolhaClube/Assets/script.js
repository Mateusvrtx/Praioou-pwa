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
