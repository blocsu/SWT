(async() => {
    const result = await (await fetch('https://www.worldtimeserver.com/current_time_in_GB.aspx')).text();
    console.log(result.match(/\d\d:\d\d:\d\d ../)[0]);
    })();
