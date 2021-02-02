let num = 266219;

//перевод числа в строку
let stringNum = num.toString();

//создать из строки массив
let arrayStr = stringNum.split('');

//перевести каждый элемент массива из строки в число
let arrayNum = arrayStr.map(Number);

//результат произведения записывается в переменную result, изначально она равна 1,
//потому что без заданного значения она undefined, а результат выходит NaN
let result = 1;
//произведение (умножение) цифр этого числа
for (let i = 0; i < arrayNum.length; i++) {
  result *= arrayNum[i];
}
console.log('результат: ' + result);

//результат в 3 степени
let newRes = result ** 3;

//перевод числа newRes в строку, вырезание из строки первых двух элементов 
//(создан новый массив)
console.log(newRes.toString().slice(0, 2));