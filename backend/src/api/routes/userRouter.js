import { Router } from "express";
import passport from "passport";
import {
  getUserInfo,
  getUsersList,
  postLogin,
  postRegister,
  postRegisterAdmin,
  postLogout,
} from "../controllers/userController.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";
import { avatarUpload } from "../utils/multer.js";

const router = Router();

router.get("/", ensureAuth, getUserInfo);
router.get("/list", ensureAuth, getUsersList);
router.post("/login", passport.authenticate("login"), postLogin);
router.post("/register", avatarUpload.single("avatar"), postRegister);
router.post("/admin", ensureAdminAuth, postRegisterAdmin); // TODO test more
router.post("/logout", ensureAuth, postLogout);

export default router;
