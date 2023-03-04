errorHandler = (err, req, res, next) => {
    if(err.name === "ErrorNotFound"){
        res.status(404).json({
            message: "Error Not Found"
        });
    }else{
        res.status(500).json({
            massage: "internal Server Error"
        })
    }
    console.log(err);
}

module.exports = errorHandler;