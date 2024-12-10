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
