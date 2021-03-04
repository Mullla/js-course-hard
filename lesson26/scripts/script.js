window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // timer, deadline - время до которого идет отсчет
    function countTimer(deadline) {
        const timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');


            function getTimeRemaining() {
                let dateStop = new Date(deadline).getTime(), // в миллисекундах, чтобы была корректная разница
                dateNow = new Date().getTime(), // в миллисекундах, чтобы была корректная разница
                timeRemaining = (dateStop - dateNow) / 1000, //всего осталось времени в секундах
                seconds = Math.floor(timeRemaining % 60), // вычленяем секунды из общего времени, все остальное пойжет на минуты и часы
                minutes = Math.floor((timeRemaining / 60) % 60), // вычленяем минуты
                hours = Math.floor(timeRemaining / 60 / 60 % 24); //получаем часы

                return {timeRemaining, hours, minutes, seconds};
            }   

            function updateTimer() {  
                let timer = getTimeRemaining();

                const formatTime = (data) => {
                    return (data < 10) ? '0' + data : data;
                };

                timerHours.textContent = formatTime(timer.hours);
                timerMinutes.textContent = formatTime(timer.minutes);
                timerSeconds.textContent = formatTime(timer.seconds);

                if (timer.timeRemaining > 0) {
                    setInterval(updateTimer, 1000);
                } else {
                    timerHours.textContent = '00';
                    timerHours.style.color = 'crimson';
                    timerMinutes.textContent = '00';
                    timerMinutes.style.color = 'crimson';
                    timerSeconds.textContent = '00';
                    timerSeconds.style.color = 'crimson';
                }
            }
        
            updateTimer();
    }

    countTimer('22 march 2021');

    // menu
    const toggleMenu = () => {
        const menuBtn = document.querySelector('.menu'), // кнопка меню
            menu = document.querySelector('menu'), // тег с блоком меню
            firstSectionLink = document.querySelector('a>img'); // ссылка перехода к первому слайду

            // переключает активный класс у меню
            const handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };

            // smooth scroll
            const smoothScroll = (target) => {
                if (target.closest('li>a') || target.closest('a>img')) {
                    event.preventDefault(); // отменяю обычный переход по ссылке, чтобы добавить плавный

                    target = target.closest('a'); 

                    let id = target.getAttribute('href').substr(1); //выделяю часть ссылки href = #<...>, чтобы подставить значение <...> и найти элемент по id

                    document.getElementById(id).scrollIntoView({ //скроллю к элементу с заданным id
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

            menuBtn.addEventListener('click', handlerMenu);

            menu.addEventListener('click',(event) => {
                let target = event.target;

                if (target.classList.contains('close-btn') || target.closest('a')){
                    handlerMenu();
                }

                smoothScroll(target);
            });

            firstSectionLink.addEventListener('click', (event) => {
                let target = event.target;

                smoothScroll(target);
            });

    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtns = document.querySelectorAll('.popup-btn');

            popupBtns.forEach((elem) => {
                elem.addEventListener('click', () => {
                    // если размер экрана пользователя < 768px, анимация отключается
                    if (document.documentElement.clientWidth  > 768){
                        popup.style.display = 'block';
                        animation();
                    } else {
                        popup.style.display = 'block';
                    }
                });
            });

            popup.addEventListener('click', (event) => {
                let target = event.target;

                    if (target.classList.contains('popup-close')){
                        popup.style.display = 'none';
                    } else {
                        target = target.closest('.popup-content');

                        if (!target) {
                            popup.style.display = 'none';
                        }
                    }

            });

            //popup animation
            const animation = () => {
                let popupAnimation,
                progress = 0;

                const popupAnimate = function() {
                    progress++;
                    popupAnimation = requestAnimationFrame(popupAnimate);

                    if (progress < 30){
                        popup.style.opacity = progress / 30; 
                    } else {
                        cancelAnimationFrame(popupAnimation);
                    }
            };

            popupAnimate();
        }
    }

    togglePopup();

    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = tabHeader.querySelectorAll('.service-header-tab'),
            tabsContent = document.querySelectorAll('.service-tab');

            const toggleTabsContent = (index) => {
                for (let i = 0; i < tabsContent.length; i++) {
                    if (index === i){
                        tabsContent[i].classList.remove('d-none');
                        tabs[i].classList.add('active');
                    } else {
                        tabsContent[i].classList.add('d-none');
                        tabs[i].classList.remove('active');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab'); // проверяет селектор, если есть - возвращает этот элемент, если нет, то проверяет родителя и тд

                    if (target){
                        tabs.forEach((item, i) => {
                            if (item === target) {
                                toggleTabsContent(i);
                            }
                        });
                    }


            });
    };

    tabs();

    // добавляет слайдеру точки переключения
    const addDots = (container, amount) => {

        let ul = document.createElement('ul');
        ul.classList.add('portfolio-dots')
        container.append(ul);

        for (let i = 0; i < amount; i++){
            let li = document.createElement('li');
            li.classList.add('dot');
            ul.append(li);
        }
    };

    //slider
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slides = slider.querySelectorAll('.portfolio-item');

            addDots(slider, slides.length);

            const dots = slider.querySelectorAll('.dot'); // получаю точки со страницы

            let currentSlide = 0, // текущий слайд
                interval; // для остановки и запуска слайдера

            // тк добавление и удаление класса часто происходит, они вынесены в отдельные функции
            // чтобы они работали не только для самих слайдов. но и для точек
            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };

            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

            // функция автоперелистывания
            const autoPlaySlide = () => {
                // у текущего слайда убираю активный класс
                prevSlide(slides, currentSlide, 'portfolio-item-active');
                prevSlide(dots, currentSlide, 'dot-active');

                // перехожу к следующему слайду
                currentSlide++; 

                // если это последний слайд, то возвращаюсь на первый
                if (currentSlide >= slides.length){
                    currentSlide = 0;
                }

                //добавляю следующему слайду активный класс
                nextSlide(slides, currentSlide, 'portfolio-item-active');
                nextSlide(dots, currentSlide, 'dot-active');
            };

            // запускает слайдер
            const startSlider = (time = 3000) => { // если параметры не переданы, то по умолчанию 3 секунды
                interval = setInterval(autoPlaySlide, time); 
            };

            //останавливает слайдер при наведении на стрелки и точки
            const stopSlider = () => {
                clearInterval(interval);
            };

            slider.addEventListener('click', (e) => {
                e.preventDefault();

                let target = e.target;

                if (!target.matches('.portfolio-btn, .dot')) { // если клик не по этим селекторам, событие не срабатывает
                    return;
                }
                // убираем активный класс у текущего слайда
                prevSlide(slides, currentSlide, 'portfolio-item-active');
                prevSlide(dots, currentSlide, 'dot-active');

                
                if (target.matches('#arrow-right')) { // если это стрелка вправо, то листает следующий слайд
                    currentSlide++;
                } else if (target.matches('#arrow-left')) { // если это стрелка влево, то листает предыдущий слайд
                    currentSlide--;
                } else if (target.matches('.dot')){
                    dots.forEach((elem, index) => {
                        if (elem === target){
                            currentSlide = index;
                        }
                    });
                }

                // если слайд был последний, то переходит к первому
                if (currentSlide >= slides.length){
                    currentSlide = 0;
                } 
                // если слайд был первый, то переходит к последнему
                if (currentSlide < 0) {
                    currentSlide = slides.length-1;
                }

                // добавляем активный класс слайду, у которого выполняется условие
                nextSlide(slides, currentSlide, 'portfolio-item-active');
                nextSlide(dots, currentSlide, 'dot-active');
            });

            slider.addEventListener('mouseover', (e) => {
                if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                    stopSlider();
                }
            });

            slider.addEventListener('mouseout', (e) => {
                // if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                //     startSlider(1500);
                // }
                if (e.target.matches('.portfolio-btn, .dot')){
                    startSlider(1500);
                }
            });

            startSlider(1500);

    };

    slider();

    // change dataset-img
    const changeImgs = () => {
        const commandSection = document.getElementById('command');

        let temp;
        commandSection.addEventListener('mouseover', (e) => {
            let target = e.target;

            if(target.classList.contains('command__photo')){
                temp = target.src;
                target.src = target.dataset.img;
            }
            
        });

        commandSection.addEventListener('mouseout', (e) => {
            let target = e.target;

            if(target.classList.contains('command__photo')){
                target.src = temp;
            }
            
        });
        
    }

    changeImgs();


    // калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = calcBlock.querySelector('.calc-type'), // тип помещения 
            calcSquare = calcBlock.querySelector('.calc-square'), // площадь помещения
            calcDay = calcBlock.querySelector('.calc-day'), // срок исполнения
            calcCount = calcBlock.querySelector('.calc-count'), // количество помещений
            totalValue = document.getElementById('total'); // итоговая сумма

        // считает итоговую цену
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

                // количество помещений, по умолчанию 1
                if(calcCount.value > 1){
                    countValue += (calcCount.value - 1)/10;
                }

                // расчет за срочность, если срок меньше 5 дней, то в 2 раза дороже, если меньше 10 - в 1.5
                // при вводе calcDay.value сразу не считывается, поэтому всегда будет заходить в первое условие, поэтому здесь проверка на существование
                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if(calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5
                }

                // если обе переменные сузествуют, то есть === true
                if (typeValue && squareValue) {
                    total = price * squareValue * typeValue * countValue * dayValue;
                } 

            totalValue.textContent = total;
        };


        calcBlock.addEventListener('change', (e) => {
            const target = e.target;

            if (target.matches('.calc-type, .calc-square, .calc-day, .calc-count')) {
                countSum();
            }
        });

    };

    calc();

    //send ajax
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = `<span class="loader"></span>`,
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся';

        // все формы со страницы
        const forms = document.querySelectorAll('form');

        const statusMessage = document.createElement('div');
        // statusMessage.classList.add('loading');
        statusMessage.style.cssText = 'font-size: 2rem; color: #fff;';

        // валидация
        const validate = (input) => {
            const regPhone = /[^\+\d+]/g,
                regName = /[^а-яё\s]+/gi,
                regMessage = /[^а-яё\s\.,:;\-\!\?\d]+/gi;
        
                input.addEventListener('input', () => {
                    if(input.type === 'tel'){
                        input.value = input.value.replace(regPhone, ''); 
        
                    } else if(input.name === 'user_name'){
                        input.value = input.value.replace(regName, '');
        
                    } else if(input.name === 'user_message'){
                        input.value = input.value.replace(regMessage, '');
                    }
                });
        }

        // создание и перебор элементов формы
        const createFormElements = (form) => {
            // массив с инпутами из формы
            const formElements = [];
            // добавление инпута в массив с элементами формы
            for (const elem of form.elements) {
                if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
                    formElements.push(elem);
                }
            }
        
            formElements.forEach( (elem) => validate(elem));
        
        };

        // для каждой формы отправка данных
        forms.forEach( (form) => {
            
            createFormElements(form);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                form.append(statusMessage);
                statusMessage.innerHTML = loadMessage;

                // присваивает body результат работы функции createBody для формы
                let body = createBody(form);

                //принимает объект body, две функции, которые оповещают пользователя об успешной отправке или об ошибке
                postData(body, () => {
                    statusMessage.textContent = successMessage;
                }, 
                (error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
    
                // очищает значения формы
                e.target.reset();
            });
        });


        // функция работает только с запросом, принимает body и функции-оповещения пользователя
        const postData = (body, notifySuccess, notifyError) => {
            //создали объект request
            const request = new XMLHttpRequest();

            // сразу прослушка события, чтобы отловить все состояния от 1 до 4
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return; // ждем, когда станет 4
                }
                if (request.status === 200) {
                    notifySuccess();
                } else {
                    notifyError(request.status);
                }
            });

            // настройка соединения
            request.open('POST', './server.php');
            // настройка заголовков
            request.setRequestHeader('Content-Type', 'application/json');
            // открываем соединение и отправляем данные
            request.send(JSON.stringify(body));
        };

        // создает объект body из формы
        const createBody = (form) => {
            // объект содержит все данные формы
            //если у inputa не будет name, то formData не заполнится
            const formData = new FormData(form); 
            // когда сервер не понимает формат formData, отправляются другие данные
            let body = {};
    
            // перебираем значения formData и записывем их в объект body в формате ключ:значение
            formData.forEach( (val, key) => {
                body[key] = val;
            });

            return body;
        }

    };

    sendForm();


});

