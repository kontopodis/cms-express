const responses = Object.freeze({
    ok:{
        statusCode:201,
        message:"OK"
    },
    badRequest:{
        statusCode:400,
        message:"Bad Request"
    },
    notAuthorised:{
        statusCode:403,
        message:"You are not authorised for this action"
    },
    userExists:{
        statusCode:409,
        message:"User Exists"
    },
    internalError:{
        statusCode:500,
        message:"Internal Error"
    },
    notAthenticated:{
        statusCode:401,
        message:"Wrong inputs"
    }
})

export default responses