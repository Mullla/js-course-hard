window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const shape = document.querySelector('.shape'),
        pauseBtn = document.querySelector('.pause'),
        resetBtn = document.querySelect('.reset');

    let animationId;
    function animate({timing, draw, duration}) {

        // let start = performance.now();

        animationId = requestAnimationFrame(animate);


        // описание работы requestAnimationFrame
        // requestAnimationFrame(function animate(time) {
        //     // timeFraction изменяется от 0 до 1
        //     let timeFraction = (time - start) / duration;
        //     if (timeFraction > 1) timeFraction = 1;
    
        //     // вычисление текущего состояния анимации
        //     let progress = timing(timeFraction);
    
        //     function draw(progress) {

        //     } 

        //     function pause() {
        //         cancelAnimationFrame(animationId);
        //     }

        //     function start() {
        //         // store the id returned from requestAnimationFrame
        //         animationId = requestAnimationFrame(draw);
        //     }

            

        //     if (timeFraction < 1) {
        //         requestAnimationFrame(animate);
        //     }

        // });

        // start();
    }

    // для паузы
    let animate = false;
    pauseBtn.addEventListener('click', () => {
        if (!animate) {
            animationId = requestAnimationFrame(animate);
            animate = true;
        } else {
            animate = false;
            cancelAnimationFrame(animationId);
        }
    });

})