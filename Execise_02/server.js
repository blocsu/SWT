const dnode = require('dnode');

const server = dnode({
    mul(n, m, cb) {
    cb(n * m);
    }
    });
    server.listen(5555);