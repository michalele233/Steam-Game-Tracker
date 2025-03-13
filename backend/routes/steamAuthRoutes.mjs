import express from "express";
import passport from "passport";

const steamRouter = express.Router();

steamRouter.get("/logout", function (req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("http://localhost:5173");
	});
});

steamRouter.get(
	"/auth/steam",
	passport.authenticate("steam", { failureRedirect: "/" })
);

steamRouter.get(
	"/auth/steam/return",
	passport.authenticate("steam", { failureRedirect: "/" }),
	function (req, res) {
		res.redirect(
			`http://localhost:5173?steamid=${req.user._json.steamid}&isAuthenticated=true`
		);
	}
);

export default steamRouter;
