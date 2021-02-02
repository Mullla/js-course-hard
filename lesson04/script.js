// получаем данные от пользователя
let inputValue = prompt('Введите строку');

// обработка входящих данных
let checkString = function(data){
  if (typeof data !== 'string'){
    return 'Это не строка';
  }

  //обрезаем пробелы
  let string = data.trim();

  if(string.length > 30){
    // обрезаем строку до 30 символа
    return string.substring(0, 30) + '...';
  }

  // возвращаем строку
  return string;
}

// выводим результат работы функции
console.log(checkString(inputValue));