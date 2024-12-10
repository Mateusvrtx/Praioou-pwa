
const faq_items = document.querySelectorAll('.faq-item');

faq_items.forEach(item => {
const toggleIcon = item.querySelector('.faq-seta');

toggleIcon.addEventListener('click', () => {
    faq_items.forEach(i => {
    if (i !== item) {
        i.classList.remove('ativado');
    }
    });

    item.classList.toggle('ativado');
});
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
