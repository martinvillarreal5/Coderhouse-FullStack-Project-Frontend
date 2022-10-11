const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    return next();
  }
  console.log("Not Auth");
  res.status(401).json("Not authenticated, user must be logged in");
};

const ensureAdminAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    if (req.user.isAdmin) {
      console.log("User is authenticated and is Admin");
      return next();
    }
    console.log("Not Admin");
    return res.status(403).json("Not authorized, user must be Admin");
  } else {
    console.log("Not Auth");
    return res.status(401).json("Not authenticated, user must be logged in");
  }
};

export { ensureAuth, ensureAdminAuth };
