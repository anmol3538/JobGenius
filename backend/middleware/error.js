class Errorhandler extends Error{
    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode;
    }
}

export const errormiddleware = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server error";
    if(err.name == "CastError"){
        const message = `Invalid ${err.path}`;
        err = new Errorhandler(message, 400)
    }
    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`
        err = new Errorhandler(message, 400)
    }
    if(err.name == "JsonWebTokenError"){
        const message = `Json web token is invalid. Try again.`;
        err = new Errorhandler(message, 400)
    }
    if(err.name == "TokenExpiredError"){
        const message = `Json Web Token is expired. Try again.`;
        err = new Errorhandler(message, 400)
    }
    return res.status(err.statuscode).json({
        success: false,
        message: err.message,
        err: err
    })
}

export default Errorhandler;