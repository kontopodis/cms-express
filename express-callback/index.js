import {userCache} from '../server.js'
const makeExpressCallback = (controller)=> {
    return (req, res) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: req.headers
      }
      //console.log("HTTTP REQUEST")
      console.log(httpRequest.path,)
      console.log(httpRequest.method)
      
      //console.log("END OF HTTP REQUEST")
      controller(httpRequest)
        .then(httpResponse => {
          //console.log(httpResponse)
          if (httpResponse.headers) {
            res.set(httpResponse.headers)
          }
          res.type('json')
          res.status(httpResponse.statusCode).send(httpResponse.body)
        })
        .catch(e => {
          console.log(e)
            res.status(500).send({ error: 'An unkown error occurred.' })
      
        })
    }
  }
  export default makeExpressCallback