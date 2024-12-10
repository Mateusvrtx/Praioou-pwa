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

document.getElementById('date').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove não-números
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, '$1/$2');
    if (value.length > 5) value = value.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    e.target.value = value.slice(0, 10); // Limita a 10 caracteres
});