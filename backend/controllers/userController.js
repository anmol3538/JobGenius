import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Errorhandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import {sendtoken} from "../utils/jwtoken.js"
export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const {
            name, email, phone, address, password, role, 
            firstNiche, secondNiche, thirdNiche, coverletter
        } = req.body;
        if (!name || !email || !phone || !address || !password || !role) {
            return next(new Errorhandler("All fields are required", 400));
        }
        if (role === "candidate" && (!firstNiche || !secondNiche || !thirdNiche)) {
            return next(new Errorhandler("Please provide your preferred job", 400));
        }
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return next(new Errorhandler("Email already in use", 400));
        }
        const userdata = {
            name, email, phone, address, password, coverletter,
        role, niches: {firstNiche, secondNiche, thirdNiche},
        };
        console.log(userdata); 
        console.log(req.files);
        if (req.files && req.files.resume) {
            const { resume } = req.files;
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {
                    folder: "Job_Seeker_Resume",
                });
                if (!cloudinaryResponse || cloudinaryResponse.error) {
                    return next(new Errorhandler("Failed to upload resume", 500));
                }

                userdata.resume = {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url
                };
            } catch (error) {
                return next(new Errorhandler("Failed to upload resume", 500));
            }
        }

        // Create user
        const user = await User.create(userdata);
        sendtoken(user, 201, res, "user registered");
    } catch (error) {
        next(error);
    }
});


export const login = catchAsyncErrors(async(req, res, next) => {
    const {role, email, password} = req.body;
    if(!role || !email || !password){
        return next(
            new Errorhandler("Email, password and role are required", 400)
        )
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("Invalid email or password", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid email or password.", 400))
    }
    if(user.role !== role){
        return next(new Errorhandler("Invalid role", 400));
    }
    sendtoken(user, 200, res, "User logged in successfully.")
})

export const logout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(
            0
        ), 
        httpOnly: true,
    }).json({
        status: true,
        message: "Logged out successfully."
    })
}) 