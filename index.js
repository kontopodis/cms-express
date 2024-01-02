const app = require('./server')
const log = require("./modules/log.js")
const port = process.env.port || 3000;
app.listen(port, function () {
    log(`Server on port ${port}!`);
});