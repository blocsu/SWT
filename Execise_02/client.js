const dnode = require('dnode');
dnode
.connect(5555, (remote) => {
remote.mul(10, 20, n => console.log(`10 * 20 = ${n}`));
});