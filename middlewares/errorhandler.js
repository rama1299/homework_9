errorHandler = (err, req, res, next) => {
    if(err.name === "ErrorNotFound"){
        res.status(404).json({
            message: "Error Not Found"
        });
    }else if(err.name === "ErrorWrongPassword"){
        res.status(404).json({
            message: "Worng Password Username"})

    }else if(err.name === "Unauthenticated"){
        res.status(404).json({
            message: "Unauthenticated"})

    }else if(err.name === "JWTError"){
        res.status(404).json({
            message: "JWT Error"})

    }else if(err.name === "Unauthorized"){
        res.status(401).json({
            message: "Unauthorized"})

    }else{
        res.status(500).json({
            massage: "internal Server Error"
        })
    }
    console.log(err);
}

module.exports = errorHandler;