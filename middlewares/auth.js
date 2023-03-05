const jwt = require("jsonwebtoken");
const secretKey = "RAHASIALAH";
const pool= require("../config");

function authentic (req, res, next) {
    const {token} = req.headers;

    if (token) {
        try{
            const decoded = jwt.verify(token,secretKey);
            const {email, role} = decoded;
            const findUser =
            `SELECT *
            FROM users
            Where email = $1`

            pool.query(findUser, [email], (err, result)=>{
                if(err) next(err);

                if(result.rows.length === 0){
                    next ({name: "ErrorNotFound"})
                } else{
                    const user = result.rows[0];
                    req.loggedUser = {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }
                    next();
                }

            })
        }
        catch (err) {
            next({name: "JWTError"})
        }
    }else{
        next({name: "Unauthenticated",})
    }
}

function authoriz (req, res, next) {
    console.log(req.loggedUser);
    const {id, email, role} = req.loggedUser;

    if(role === "Developer"){
        next();
    }else{
        next({name: "Unauthorized"});
    }
}

module.exports = {authentic, authoriz};