const jwt = require('jwt');
const secretKey = "RAHASIALAH";

const authentication = (req, res, next)=>{
    console.log(req.headers);
    const {token} = req.headers;

    if(token){
        const decoded = jwt.decode(token, secretKey);

        console.log(decoded);
    }else{
        next({name: "Unauthenticated"})
    }
}

const authorization = (req, res, next)=>{
    console.log("Authorization")
}

module.export = authentication;