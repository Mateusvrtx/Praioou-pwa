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