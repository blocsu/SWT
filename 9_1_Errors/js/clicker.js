 window.Clicker = class {
   constructor(onclick = () => alert('Thank you!'), 
               title = 'Click me!',
               inlineCss = ''
              ) {
     const newBt = document.createElement('button');
     newBt.appendChild(document.createTextNode(title));
     newBt.setAttribute('style', inlineCss);
     newBt.setAttribute('class', 'gossclicker');
     newBt.addEventListener('click', onclick);
     
     document.body.appendChild(newBt);
     return newBt;
   }
 };
window.css = (el, styles = {}) => Object.assign(el.style, styles);