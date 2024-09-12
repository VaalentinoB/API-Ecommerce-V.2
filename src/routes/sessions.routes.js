import { Router } from "express";
import passport from "passport";
import userControllers from "../controllers/user.controllers.js";



const router = Router();



router.post("/register", userControllers.register);

router.post("/login", userControllers.login);

/// Mi ruta current la denomine home 
router.get("/home", passport.authenticate("jwt", { session: false }), userControllers.current)
router.post("/logout",userControllers.logout);





export default router