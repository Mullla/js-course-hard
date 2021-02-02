/* ------- 1 ------- */
let lang = prompt('Введите язык: ru или en');

// Объявляем переменные, в которых хранятся дни недели на русском и английском
const daysRu = 'Пн, Вт, Ср, Чт, Пт, Сб, Вс',
      daysEn = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';

/* в зависимости от значения lang будут выводится дни недели на русском 
или английском языке */

// через if 
if (lang === 'ru'){
  console.log(daysRu);
} else if (lang === 'en'){
  console.log(daysEn);
} else {
  console.log('Язык не определен.');
}

// через switch-case
switch(lang) {
  case 'ru':  // if (x === 'value1')
  console.log(daysRu);
  break;

  case 'en': 
  console.log(daysEn);
  break;

  default:
  console.log('Язык не определен.');
}

// через многомерный массив без ифов и switch
let daysLang = [
  ['ru', 'en'],
  ['Пн, Вт, Ср, Чт, Пт, Сб, Вс', 
  'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday']
];
/* индексы языка и строки с днями недели совпадают, 
1. daysLang[0].indexOf(lang) - ищу индекс, по которому в массиве записан язык (будет -1, если языка нет)
2. обращаюсь к массиву строк с днями недели по этому индексу (если языка нет, то будет undefined)
*/
console.log(daysLang[1][daysLang[0].indexOf(lang)]);

// через коллекцию map
// создаем новую коллекцию, где ключом будет язык, а значением - строка с днями недели
let langMap = new Map();

// добавляем в коллекцию пары ключ - значение
langMap.set('ru', 'Пн, Вт, Ср, Чт, Пт, Сб, Вс')
      .set('en', 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');

// получаем значение по ключу и выводим в консоль, если ключа нет, то вернется undefined
console.log(langMap.get(lang));

/* ------- 2 ------- */
let namePerson = prompt('Введите ваше имя с большой буквы (ё вводится как е)');

let result = namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент';
console.log( result ); 