
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
          