let phrases = [
    { text: 'отправить другу смешную гифку', image: 'https://code.s3.yandex.net/web-code/procrastinate/1.gif' },
    { text: 'посмотреть скидки на авиабилеты', image: 'https://code.s3.yandex.net/web-code/procrastinate/2.png' },
    { text: 'разобраться, о чём поют рэперы', image: 'https://code.s3.yandex.net/web-code/procrastinate/3.png' },
    { text: 'Юрий Дудь', image: 'https://code.s3.yandex.net/web-code/procrastinate/4.png' },
    { text: 'расставить книги на полке по цвету', image: 'https://code.s3.yandex.net/web-code/procrastinate/5.png' },
    { text: 'читать про зарплаты в Сан-Франциско', image: 'https://code.s3.yandex.net/web-code/procrastinate/6.png' },
    { text: 'прочитать новости и ужаснуться в комментариях', image: 'https://code.s3.yandex.net/web-code/procrastinate/7.png' },
    { text: 'попасть в поток грустных песен и вспомнить все ошибки молодости #Хтонь', image: 'https://code.s3.yandex.net/web-code/procrastinate/8.png' },
    { text: 'посмотреть трейлер сериала и заодно весь первый сезон', image: 'https://code.s3.yandex.net/web-code/procrastinate/9.png' },
    { text: 'проверить непрочитанное в Telegram-каналах', image: 'https://code.s3.yandex.net/web-code/procrastinate/10.png' },
    { text: 'оформлять монобутики Филип Моррис', image: 'img/philip-morris-1-logo-png-transparent.png' },
];
let arr 
function getRandomElement(arr){
    let randIndex = Math.floor(Math.random()*arr.length);
    return arr[randIndex]; 
};
// функция рандома

let button = document.querySelector('.button');
let advice = document.querySelector('.advice');
let phrase  = document.querySelector('.phrase');
let image = document.querySelector('.image');
// выбор эллементов сстраницы

button.addEventListener('click', function () {
    let randomElement = getRandomElement(phrases);
    smoothly(phrase, 'textContent', randomElement.text)
    smoothly(image, 'src', randomElement.image)
    // что происходит при клике по кнопке
    if (randomElement.text.length > 40) 
        {
        advice.style.fontSize = '33px';
        } else {
        advice.style.fontSize = '42px';
        }
}); 

setTimeout(function(){
    for (let i=0; i <= 1; i = i + 1){
        let randomFromStart = getRandomElement(phrases);
        console.log (randomFromStart.text);
        smoothly(phrase, 'textContent', randomFromStart.text);
        smoothly(image, 'src', randomFromStart.image);
    }
    //for (let i=0; i <= 2; i = i + 1){
        //console.log (phrases[i]);
        //smoothly(phrase, 'textContent', phrases[i].text);
        //smoothly(image, 'src', phrases[i].image);
        //}
}, 1000);