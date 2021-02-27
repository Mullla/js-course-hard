'use strict';

class Todo{
    constructor(form, input, todoList, todoListCompleted){
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoListCompleted = document.querySelector(todoListCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render(){
        // очистка списка дел
        this.todoList.textContent = '';
        this.todoListCompleted.textContent = '';

        //создание элемента списка
        // тк createItem передается как коллбэк, у него нет своего this, поэтому либо стрелочная функция, либо после него передать this
        this.todoData.forEach(this.createItem); 

        //добавление в localStorage
        this.addToStorage();
    }
    
    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoListCompleted.append(li);
        } else {
            this.todoList.append(li);
        }

        this.input.value = '';
    }

    addTodo(e){
        e.preventDefault();

        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            alert('Нельзя добавить пустое дело!');
        }
    }

    // генерация случайного значения ключа
    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target){
        const elem = target.closest('.todo-item');
        // нахожу ключ элемента
        const itemKey = elem.key;

        this.animate({
            duration: 700,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                elem.style.backgroundColor = `rgba(${42*(1-progress)}, ${78*(1-progress)}, ${105*(1-progress)})`;
                elem.style.opacity = (1 - progress);
            }
        });
        // удаляю из коллекции по ключу
        this.todoData.delete(itemKey);

        setTimeout(this.render.bind(this), 700);
    }

    completeItem(target){
        const elem = target.closest('.todo-item');
        // нахожу ключ элемента
        const itemKey = elem.key;
        // получаю элемент коллекции по ключу
        const item = this.todoData.get(itemKey);

        
        // меняю его свойство completed на противоположное
        item.completed = !item.completed;

        this.animate({
            duration: 800,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                elem.style.transform = `scale(${1.1*(1-progress)})`;
            }
        });


        setTimeout(this.render.bind(this), 800);
    }

    editItem(target){
        //нахожу элемент
        const item = target.closest('.todo-item');
        // получаю элемент коллекции по ключу
        const todoItem = this.todoData.get(item.key);

        // позволяет редактировать текст элемента
        item.contentEditable = true;

        // записываю новое значение после снятия фокуса с текста
        item.addEventListener('blur', () =>{
            todoItem.value = item.textContent.trim();
            item.contentEditable = false;
            this.render();
        })
        
    }

    // определяет на какую кнопку кликнули
    handler(){
        const container = document.querySelector('.todo-container');
        
        container.addEventListener('click', (e) => {
            let target = e.target;

            if(target.matches('.todo-remove')){
                this.deleteItem(target);

            } else if(target.matches('.todo-complete')){
                this.completeItem(target);

            } else if(target.matches('.todo-edit')){
                this.editItem(target);
                // устанавливает фокус на поле
                target.closest('.todo-item').focus();

            }
        });
    }

    init(){
        this.form.addEventListener('submit', this.addTodo.bind(this)); 
        this.render();
        this.handler();
    }

    // паттерн, который определяет анимацию
    // при вызове надо задать парметры анимации: draw
    animate({timing, draw, duration}) {

        let start = performance.now();
        
        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
        
            // вычисление текущего состояния анимации
            let progress = timing(timeFraction);
        
            draw(progress); // отрисовать её
        
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        
        });
    }

}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();