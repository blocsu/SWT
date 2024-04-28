#!/usr/bin/env node

fetch('https://www.worldtimeserver.com/current_time_in_GB.aspx')
.then(x => x.text())
.then(x => console.log(x.match(/\d\d:\d\d:\d\d ../)[0]));