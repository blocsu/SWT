//Неделя 3. Асинхронность. Слушатели событий 01_видео

document.querySelectorAll('ul li')[2].style.color = 'blue';

function app() {
    document.querySelectorAll('ul li')
    .forEach(x => x.textContent = x.textContent.toUpperCase());

    setTimeout(() => {document.querySelector('button')
    .dispatchEvent(new MouseEvent('click'))}, 5000);        
}

