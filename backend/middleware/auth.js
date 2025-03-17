import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import Errorhandler from "./error.js";
import jwt from "jsonwebtoken"
export const isAuth = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new Errorhandler("User is not authenticated", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(new Errorhandler("User not found", 404));
        }

        next();
    } catch (error) {
        return next(new Errorhandler("Invalid or expired token", 401));
    }
})