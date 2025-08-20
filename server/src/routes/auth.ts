// user auth ( signup  and signin)

import express from "express";
const AuthRouter = express.Router();


AuthRouter.post("/signup", async (req, res) => {   
    // apply your logic here
    // get user data from req.body
    // create a new user
    // return user data and success message
    res.json({
        msg: "User signed up successfully",
    });
});

AuthRouter.post("/signin", async (req, res) => {
    // apply your logic here
    // get user data from req.body
    // validate user credentials
    // return user data and success message
    res.json({
        msg: "User signed in successfully",
    });
});



export default AuthRouter;