function log (message,color="white"){
    if (color == "red"){
        console.log(" \x1b[31m "+message + "\x1b[37m")
    }

    if (color == "green"){
        console.log(" \x1b[32m "+message + "\x1b[37m")
    }

    if (color == "yellow"){
        console.log(" \x1b[33m "+message + "\x1b[37m")
    }

    if (color == "blue"){
        console.log(" \x1b[34m "+message + "\x1b[37m")
    }

    if (color == "white"){
        console.log(" \x1b[37m "+message + "\x1b[37m")
    }
}

module.exports =  log