const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("User is authorized")
        return next();
    } 
    console.log("Not Auth")
    res.status(401).json("Not authorized, user must be loged in")
}


export {
    ensureAuth,
}