// dark mode

document.addEventListener('DOMContentLoaded', () => {
    // Verifica a preferência armazenada no localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (darkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
       
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
     
    }
});     