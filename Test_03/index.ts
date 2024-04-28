const s: string = '<h1>Привет пользователь!</h1>';
const el: HTMLElement = document.body;
el.insertAdjacentHTML('afterbegin', s);