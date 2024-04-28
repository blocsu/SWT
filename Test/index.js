// const result = await (await
//     fetch('https://www.worldtimeserver.com/current_time_in_GB.aspx')).text();
//     console.log(result.match(/\d\d:\d\d:\d\d ../)[0]);

import { JSDOM } from 'jsdom';
const myURL = 'https://www.worldtimeserver.com/current_time_in_GB.aspx';
const result = await (await fetch(myURL)).text();
const { document } = (new JSDOM(result)).window;
console.log(document.querySelector('#theTime').textContent.trim());