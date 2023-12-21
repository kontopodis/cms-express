const makeCreateUser = (addUser)=>{
    return createUser=async(httpRequest)=>{

        try {
            const { source = {}, ...userInfo } = httpRequest.body
         
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
              source.referrer = httpRequest.headers['Referer']
            }
            const posted = await addUser(userInfo)
            return {
              headers: {
                'Content-Type': 'application/json',
                'Last-Modified': new Date(posted.modifiedOn).toUTCString()
              },
              statusCode: 201,
              body: { posted }
            }
          } catch (e) {
            // TODO: Error logging
            console.log(e)
      
            return {
              headers: {
                'Content-Type': 'application/json'
              },
              statusCode: 400,
              body: {
                error: e.message
              }
            }
          }
    }

}

module.exports = makeCreateUser