import { Router } from "express";
const router = Router();
import UsuarioModel from "../models/usuario.model.js";
import { createHash, isValidPassword } from "../util/util.js";
import passport from "passport";
import jwt from "jsonwebtoken";




router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {

        const existeUsuario = await UsuarioModel.findOne({ email });

        if (existeUsuario) {
            return res.status(400).send("Usuario ya en uso!");
        }


        const nuevoUsuario = new UsuarioModel({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            role: "usuario"
        });


        await nuevoUsuario.save();


        const token = jwt.sign({ usuario: nuevoUsuario.email, rol: nuevoUsuario.role }, "passticket", { expiresIn: "2h" });


        res.cookie("passticketCookieToken", token, {
            maxAge: 7200000,
            httpOnly: true
        })

        res.redirect("/api/sessions/home");

    } catch (error) {
        res.status(500).send("Error interno del servidor 500 ;/");
        console.log(error)
    }
})

router.get("/home", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(req.user);

    if (req.user) {
        res.render("home", { usuario: req.user.first_name });


    } else {

        res.status(401).send("No autorizado");
    }
})


export default router