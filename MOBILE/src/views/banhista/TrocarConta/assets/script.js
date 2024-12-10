document.getElementById('adicionarconta').addEventListener('click', function() {
    var modal = document.getElementById('modal');
    modal.style.display = 'block';
});

window.addEventListener('click', function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

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