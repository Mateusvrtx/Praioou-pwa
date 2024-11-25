// Primeiro Carrossel
(function() {
    let slider = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let dots = document.querySelectorAll('.slider .dots li');

    let lengthItems = items.length - 1;
    let active = 0;
    let refreshInterval = setInterval(() => { next.click() }, 3000);

    next.onclick = function() {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }
    
    prev.onclick = function() {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }

    function reloadSlider() {
        slider.style.left = -items[active].offsetLeft + 'px';
        
        let last_active_dot = document.querySelector('.slider .dots li.active');
        last_active_dot.classList.remove('active');
        dots[active].classList.add('active');

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => { next.click() }, 3000);
    }

    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        })
    });

    window.addEventListener('resize', reloadSlider);
})();

// Segundo Carrossel
(function() {
    let slider2 = document.querySelector('.slider2 .list2');
    let items2 = document.querySelectorAll('.slider2 .list2 .item2');
    let next2 = document.getElementById('next2');
    let prev2 = document.getElementById('prev2');
    let dots2 = document.querySelectorAll('.slider2 .dots2 li');

    let lengthItems = items2.length;
    let active2 = 0;
    let maxVisibleItems = 3;
    let totalSlides = Math.ceil(lengthItems / maxVisibleItems);

    let refreshInterval = setInterval(() => {
        next2.click();
    }, 3000);

    next2.onclick = function() {
        active2 = (active2 + 1) % totalSlides;
        reloadSlider2();
    }

    prev2.onclick = function() {
        active2 = (active2 - 1 + totalSlides) % totalSlides;
        reloadSlider2();
    }

    function reloadSlider2() {
        let offset = active2 * (100 / totalSlides);
        slider2.style.transform = `translateX(-${offset}%)`;

        dots2.forEach(dot => dot.classList.remove('active2'));
        if (dots2[active2]) {
            dots2[active2].classList.add('active2');
        }

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next2.click();
        }, 3000);
    }

    dots2.forEach((li, key) => {
        li.addEventListener('click', () => {
            active2 = key;
            reloadSlider2();
        });
    });

    window.addEventListener('resize', reloadSlider2);
})();

// Terceiro carrossel

(function() {
    let slider3 = document.querySelector('.slider3 .list3');
    let items3 = document.querySelectorAll('.slider3 .list3 .item3');
    let next3 = document.getElementById('next3');
    let prev3 = document.getElementById('prev3');
    let dots3 = document.querySelectorAll('.slider3 .dots3 li');

    let lengthItemss = items3.length;
    let active3 = 0;
    let maxVisibleItemss = 3;
    let totalSlidess = Math.ceil(lengthItemss / maxVisibleItemss);

    let refreshInterval = setInterval(() => {
        next3.click();
    }, 3000);

    next3.onclick = function() {
        active3 = (active3 + 1) % totalSlidess;
        reloadSlider3();
    }

    prev3.onclick = function() {
        active3 = (active3 - 1 + totalSlidess) % totalSlidess;
        reloadSlider3();
    }

    function reloadSlider3() {
        let offset = active3 * (100 / totalSlidess);
        slider3.style.transform = `translateX(-${offset}%)`;

        dots3.forEach(dot => dot.classList.remove('active3'));
        if (dots3[active3]) {
            dots3[active3].classList.add('active3');
        }

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next3.click();
        }, 3000);
    }

    dots3.forEach((li, key) => {
        li.addEventListener('click', () => {
            active3 = key;
            reloadSlider3();
        });
    });

    window.addEventListener('resize', reloadSlider3);
})();
