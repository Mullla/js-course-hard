const input = document.querySelector('.input-text'),
    paragraph = document.querySelector('.text');


function debounce(f, t) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && ((this.lastCall - previousCall) <= t)) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => f(args), t);
    }
}

const enterText = () => {
    paragraph.textContent = input.value; //записываю значение инпута в параграф
};

input.addEventListener('input', debounce(enterText, 300));