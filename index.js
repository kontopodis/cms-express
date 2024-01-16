console.log("Got till here")
import app from './server.js'
import log from "./modules/log.js"
import {
    ipFilterMiddleware,
    rateLimitMiddleware,
  } from "api-security-middleware";
const port = process.env.port || 3000;
app.use(ipFilterMiddleware);

// Rate limit for every IP, maximum of 1 requests in 5 sec
app.use(rateLimitMiddleware(1000, 1));
app.listen(port, function () {
    log(`Server on port ${port}!`);
});


