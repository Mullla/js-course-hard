'use strict';
const calculateBtn = document.getElementById('start'), // calculate button
    addIncomeBtn = document.getElementsByTagName('button')[0], // add income button '+'
    addExpensesBtn = document.getElementsByTagName('button')[1], // add expenses button '+'
    depositCheckbox = document.querySelector('#deposit-check'), // deposit checkbox
    additionalIncomeFields = document.querySelectorAll('.additional_income-item'), // fields for additional incomes
    budgetDayResult = document.querySelectorAll('.result-total')[1], // input for total result of budget day
    expensesMonthResult = document.querySelectorAll('.result-total')[2], // input for total result of expenses for month
    additionalIncomeResult = document.querySelectorAll('.result-total')[3], // input for total result of additional income
    additionalExpensesResult = document.querySelectorAll('.result-total')[4], // input for total result of additional expenses
    incomePeriodResult = document.querySelectorAll('.result-total')[5], // input for total result of income period
    targetMonthResult = document.querySelectorAll('.result-total')[6], // input for total result of target for month
    budgetMonthResult = document.querySelector('.budget_month-value'), // input for total result of budget month
    salaryAmount = document.querySelector('.salary-amount'), // input for salary amount
    targetAmount = document.querySelector('.target-amount'), // input for target amount
    additionalExpenses = document.querySelector('.additional_expenses-item'), // input for additional expenses
    periodSelect = document.querySelector('.period-select'), // select for period
    periodAmount = document.querySelector('.period-amount'), // block for period amount
    resetBtn = document.getElementById('cancel'),
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]'),
    placeholderAmount = document.querySelectorAll('[placeholder="Сумма"]');

let incomeItems = document.querySelectorAll('.income-items'), // block with 2 inputs (title and amount) for income
    expensesItems = document.querySelectorAll('.expenses-items'); // block with 2 inputs (title and amount) for expenses


class AppData {
    constructor() {
        this.budget = 0;
        // доп. заработок
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        // расходы
        this.expenses = {};
        // возможные расходы
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }
    //! check() {
    //     const _this = this;
    //     if (appData.isNumber(salaryAmount.value)) {
    //         calculateBtn.disabled = false;
    //         _this.start();
    //     } else {
    //         calculateBtn.disabled = true;
    //     }
    // }
    start() {
        const dataInputs = document.querySelectorAll('.data input[type=text]'); // все текстовые инпуты с информацией

        dataInputs.forEach(item => {
            item.disabled = true;
        });

        // блокируются кнопки добавления полей
        addExpensesBtn.disabled = true;
        addIncomeBtn.disabled = true;

        resetBtn.style.display = 'block';
        calculateBtn.style.display = 'none';

        this.budget = +salaryAmount.value;

        this.getExpensesIncomes();
        this.getExpensesMonth();
        this.getAddExpInc();
// * * * * * * * * *
        // this.getAddIncome();
        // this.getAddExpenses();
// * * * * * * * *
        this.getBudget();

        this.showResult();
    }
    reset() {
        const dataInputs = document.querySelectorAll('.data input[type=text]'),
            resultInputs = document.querySelectorAll('.result input[type=text]'); // все инпуты с результатом вычислений

        dataInputs.forEach(item => {
            item.value = ''; // значения сбрасываются на 0
            item.disabled = false;
            periodSelect.value = 0;
            periodAmount.textContent = periodSelect.value;

        });

        resultInputs.forEach(item => {
            item.value = ''; // значения сбрасываются на 0
        });

        // удаление добавленных полей доходов
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            addIncomeBtn.style.display = 'block';

        }

        // удаление добавленных полей расходов
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            addExpensesBtn.style.display = 'block';
        }

        // сброс всех значений appData
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

        resetBtn.style.display = 'none';
        calculateBtn.style.display = 'block';
        addExpensesBtn.disabled = false;
        addIncomeBtn.disabled = false;
    }
    getExpensesMonth() {
        for (let income in this.expenses) {
            this.expensesMonth += +this.expenses[income];
        }
    }
    getBudget() {
        // бюджет на месяц
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        // бюджет на день
        this.budgetDay = this.budgetMonth / 30;
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return "К сожалению, у вас уровень дохода ниже среднего";
        } else {
            return "Что то пошло не так";
        }
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    addExpIncBlocks(target){
        // получаю название статьи (доходы или расходы) по классу нажатой кнопки - expenses или income
        const itemName = target.className.split(' ')[1].split('_')[0]; 
        
        // получила коллекцию доходов или расходов
        let itemsNodeList = document.querySelectorAll(`.${itemName}-items`);

        // клонирую элемент из коллекции и вставляю его перед кнопкой
        const cloneItem = itemsNodeList[0].cloneNode(true);
        itemsNodeList[0].parentNode.insertBefore(cloneItem, target);

        // заново получаю каждый раз коллекцию
        itemsNodeList = document.querySelectorAll(`.${itemName}-items`);

        // добавление пустых полей
        for (let i = 1; i < itemsNodeList.length; i++){
            const itemTitle = itemsNodeList[i].querySelector(`.${itemName}-title`);
            const itemAmount = itemsNodeList[i].querySelector(`.${itemName}-amount`);

            itemTitle.value = '';
            this.formatChar(itemTitle);
            itemAmount.value = '';
            this.formatNum(itemAmount);
        }

        // скрываю, если добавили больше двух полей
        if (itemsNodeList.length === 3) {
            target.style.display = 'none';
        }
    }
    getExpensesIncomes(){
        const countItems = item => {
            const itemName = item.className.split('-')[0]; // получаю первое слово в названии класса - icome или expenses
            const itemTitle = item.querySelector(`.${itemName}-title`).value;
            const itemAmount = item.querySelector(`.${itemName}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                this[itemName][itemTitle] = itemAmount;
            }
        }

        incomeItems.forEach(countItems);
        expensesItems.forEach(countItems);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    showResult() {
        budgetMonthResult.value = this.budgetMonth;
        budgetDayResult.value = Math.ceil(this.budgetDay);
        expensesMonthResult.value = this.expensesMonth;
        additionalExpensesResult.value = this.addExpenses.join(', ');
        additionalIncomeResult.value = this.addIncome.join(', ');
        targetMonthResult.value = Math.ceil(this.getTargetMonth());
        incomePeriodResult.value = this.calcSavedMoney();
    }

// ? ----------------

    // getAddExpenses() {
    //     const _this = this;
    //     const addExpenses = additionalExpenses.value.split(',');
    //     addExpenses.forEach(function (item) {
    //         item = item.trim();
    //         if (item !== '') {
    //             _this.addExpenses.push(item);
    //         }
    //     });
    // }
// * ----------------------------------------------------------------
    // getAddIncome() {
    //     const _this = this;
    //     additionalIncomeFields.forEach(function (item) {
    //         const itemValue = item.value.trim();
    //         if (itemValue !== '') {
    //             _this.addIncome.push(itemValue);
    //         }
    //     });
    // }

    getAddExpInc(){
        // this - appData

        const expenses = additionalExpenses.value.split(','),
            income = additionalIncomeFields;

        if (expenses) {
            expenses.forEach(itemValue => itemValue = itemValue.trim());
            let addArray = expenses;

            console.log(addArray);
        } else if (income) {
            income.forEach(itemValue => itemValue = itemValue.value.trim());
            let addArray = addIncome;
            console.log(addArray);
        }
            
        // } else if (x) //x === 'additional_expenses_item'
        // {
    //         const addExpenses = additionalExpenses.value.split(',');
    // //     addExpenses.forEach(function (item) {
    // //         item = item.trim();
            // addArray = addExpenses
        // }
        //console.log(additionalExpenses.value.split(',')) // массив
        //console.log(additionalIncomeFields) // nodelist из элементов


        // if (itemValue !== '') {
        //     this.addArray.push(itemValue);
        // }

    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    formatChar(item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/[^а-яё\s\-]+/i, '');
        });
    }
    formatNum(item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/[^0-9\.]+/i, '');
        });
    }
    checkValues() {
        const _this = this;
        placeholderName.forEach(item => _this.formatChar(item));
        placeholderAmount.forEach(item => _this.formatNum(item));
    }
    eventListeners() {
        const _this = this;

        calculateBtn.addEventListener('click', function () {
            // ! _this.check();
            _this.start();
        });

        resetBtn.addEventListener('click', function () {
            _this.reset();
        });

        addExpensesBtn.addEventListener('click', function (event) {
            _this.addExpIncBlocks(event.target);
        });

        addIncomeBtn.addEventListener('click', function (event) {
            // передаю кнопку, чтобы получить ее класс
            _this.addExpIncBlocks(event.target);
        });

        periodSelect.addEventListener('input', function () {
            incomePeriodResult.value = _this.calcSavedMoney();
            periodAmount.textContent = periodSelect.value;
        });
    }
}



const appData = new AppData();

appData.checkValues();
appData.eventListeners.call(appData);
