import  express  from 'express';
const ProfileRouter = express.Router();



ProfileRouter.post("/", async (req, res) => {
	// apply your logic here
	// add auth middleware
	// get user id through url query parameter or req.user.id
	// get profile of the user ( if valid? )
	// return  profile

	res.json({
		msg: "This route retrieves the profile information of the authenticated user",
	});
});


ProfileRouter.post("/", async (req, res) => {
	// apply your logic here
	// add auth middleware
	// get user id through url query  req.body.userId and new data to update
    // apply profile update
	// return profile data and success message
	

	res.json({
		msg: "This route updates the profile information of the authenticated user",
	});
});

export default ProfileRouter;
