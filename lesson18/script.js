window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const shape = document.querySelector('.shape'),
        pauseBtn = document.querySelector('.pause'),
        resetBtn = document.querySelector('.reset');
    

    const animation = () => {
        let step = 0;
        let shapeId;

        const shapeAnimation = () => {
            step += 0.2;
            shapeId = requestAnimationFrame(shapeAnimation);

            if (step < 50) {
                shape.style.width = step * 2 + 'px';
                shape.style.height = step + 'px';
            }

        };

        shapeAnimation();

        let animate = true;
        pauseBtn.addEventListener('click', () => {
            // если анимация запущена, то она останавливается и флаг меняется на противоположный
            if (animate) { 
                cancelAnimationFrame(shapeId);
                animate = false;
            // если анимация не запущена, то она запускается
            } else {
                requestAnimationFrame(shapeAnimation);
                animate = true;
            }
        });



    };

    const id = requestAnimationFrame(animation);

    resetBtn.addEventListener('click', () =>{
        cancelAnimationFrame(id);
        requestAnimationFrame(animation);
    });



    
});



