let fullDate = document.createElement('div'), // full version of date
    shortDate = document.createElement('div'); // short version of date
    
    // insert divs in body 
    document.body.append(fullDate);
    document.body.append(shortDate);

    // format for short version of date
    function formatDate(date){
        // time format

        // hours format
        let h = date.getHours();
        if (h < 10) h = '0' + h;

        // minutes format
        let m = date.getMinutes();
        if (m < 10) m = '0' + m;

        // seconds format
        let s = date.getSeconds();
        if (s < 10) s = '0' + s;

        // date format

        // day format
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        // month format
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        // year format
        let yyyy = date.getFullYear();

        return `${dd}.${mm}.${yyyy} - ${h}:${m}:${s}`;
    }

    // options for locale string
    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }

    // declantion for hours
    function formatHours(date){
        let h = date.getHours();
        if (+h.toString().slice(-1) === 1 && +h.toString().slice(-1) !== 11) {
            return `${h} час`;
        } else if (+h.toString().slice(-1) < 5  && +h.toString().slice(-1) !== 0) {
            return `${h} часа`;
        } else {
            return `${h} часов`;
        }
    }

    // declantion for minutes
    function formatMinutes(date){
        let m = date.getMinutes();
        if (+m.toString().slice(-1) === 1 && +m.toString().slice(-1) !== 11) {
            return `${m} минута`;
        } else if (+m.toString().slice(-1) < 5 && +m.toString().slice(-1) !== 0) {
            return `${m} минуты`;
        } else {
            return `${m} минут`;
        }
    }

    // declantion for seconds
    function formatSeconds(date){
        let s = date.getSeconds();
        if (+s.toString().slice(-1) === 1 && +s.toString().slice(-1) !== 11) {
            return `${s} секунда`;
        } else if (+s.toString().slice(-1) < 5 && +s.toString().slice(-1) !== 0) {
            return `${s} секунды`;
        } else {
            return `${s} секунд`;
        }
    }

function updateTime(){
    let date = new Date();

    shortDate.textContent = `${formatDate(date)}`;
    fullDate.textContent = `Сегодня ${date.toLocaleString('ru', options)} ${date.getFullYear()} года, ${formatHours(date)} ${formatMinutes(date)} ${formatSeconds(date)}`;
}

// update on every second = 1000 miliseconds
setInterval(updateTime, 1000);