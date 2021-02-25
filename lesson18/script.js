window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const shape = document.querySelector('.shape'),
        pauseBtn = document.querySelector('.pause'),
        resetBtn = document.querySelector('.reset');
    
    let animate = false,
        step = 0,
        animationId;

    const animation = () => {
        step += 0.2;

        if (step < 50) {
            shape.style.width = step * 2 + 'px';
            shape.style.height = step + 'px';

            shape.style.backgroundColor = `rgb(${(10 * step).toString(16)}, ${(20 * step).toString(16)}, ${(15 * step).toString(16)})`
            console.log(shape.style.backgroundColor)

            animationId = requestAnimationFrame(animation);
        }

        animate = true;
    };

    animation();

    pauseBtn.addEventListener('click', () => {
        // если анимация запущена, то она останавливается и флаг меняется на противоположный
        if (animate) { 
            cancelAnimationFrame(animationId);
            animate = false;
        // если анимация не запущена, то она запускается
        } else {
            requestAnimationFrame(animation);
            animate = true;
        }
    });


    resetBtn.addEventListener('click', () =>{
        step = 0;
        animate = false;
        cancelAnimationFrame(animationId);
        requestAnimationFrame(animation);
    });
    
});



