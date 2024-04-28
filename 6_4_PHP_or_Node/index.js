require('http')
.Server((req, res) => {
    const {method} = req;
    if(method !== 'GET') {
        req.pipe(process.stdout)
    }
    res.writeHead(200, {"Content-type": "text/html; charset=utf-8;"})
    res.write('Node.js is ...<br /> ');
    // //((y = 5000, x = Date.now()) => { while (Date.now() - x < y) ;})();
    // setTimeout(() => {
    //     res.end('... BETTE then PHP!')
    // }, 5000);
    res.end(`Method: ${method}`)
})
.listen(8888)