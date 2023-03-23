let phrases = [
    'отправить другу смешную гифку',
    'посмотреть скидки на авиабилеты',
    'разобраться', 
    'о чём поют рэперы',
    'Юрий Вдудь',
    'расставить книги на полке по цвету',
    'читать про зарплаты в Сан-Франциско'
    ];
let arr 
function getRandomElement(arr){
let randIndex = Math.floor(Math.random()*arr.length);
return arr[randIndex]; 
}
let button = document.querySelector('.button');
let advice = document.querySelector('.advice');
let phrase  = document.querySelector('.phrase');
let image = document.querySelector('.image');

button.addEventListener('click', function () {
    phrase.textContent = getRandomElement(phrases);
    // что происходит при клике по кнопке
  }); 