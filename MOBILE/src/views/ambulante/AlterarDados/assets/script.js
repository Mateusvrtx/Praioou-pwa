const hover = document.getElementById('info');
const popUp = document.getElementById('PopUp');

hover.addEventListener('mouseover', () => {
    popUp.style.visibility = 'visible';
});
  
hover.addEventListener('mouseout', () => {
    popUp.style.visibility = 'hidden';
});

