export const sendtoken = (user, statuscode, res, message) => {
    const token = user.getJWTToken();
    const cookieExpireDays = Number(process.env.COOKIE_EXPIRE);
    
    // Check if it's a valid number, else default to 7 days
    if (isNaN(cookieExpireDays) || cookieExpireDays <= 0) {
        console.error("Invalid COOKIE_EXPIRE value. Using default (7 days).");
        cookieExpireDays = 7;
    }
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        user, 
        message,
        token,
    })
}