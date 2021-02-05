let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    // массив для преобразования текущего дня недели из числа (его выводит метод getDay) в строку
    dates = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    date = new Date();

    for (let value of week){
        let day = document.createElement('div');
        day.textContent = value;

        if (value === 'суббота' || value === 'воскресенье'){
            day.style.fontStyle = 'italic';
        }

        if (value === dates[date.getDay()]){
            day.style.fontWeight = 'bold';
        }

        document.body.append(day);
    }
