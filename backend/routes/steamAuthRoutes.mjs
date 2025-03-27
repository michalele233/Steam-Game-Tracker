import express from "express";
import passport from "passport";

const steamRouter = express.Router();

steamRouter.get("/logout", function (req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.session.destroy();
		res.redirect("https://michalele233.github.io/Steam-Game-Tracker/");
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
		req.session.steamid = req.user._json.steamid;
		req.session.isAuthenticated = true;
		res.redirect("https://michalele233.github.io/Steam-Game-Tracker/");
	}
);

steamRouter.get("/auth/status", (req, res) => {
	if (req.session.steamid && req.session.isAuthenticated) {
		res.json({
			steamid: req.session.steamid,
			isAuthenticated: req.session.isAuthenticated,
		});
	} else {
		res.status(401).json({ message: "Not authenticated" });
	}
});

export default steamRouter;
