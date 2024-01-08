console.log("Got till here")
import app from './server.js'
import log from "./modules/log.js"
const port = process.env.port || 3000;
app.listen(port, function () {
    log(`Server on port ${port}!`);
});


