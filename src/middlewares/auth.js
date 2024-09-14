export function soloAdmin(req, res, next) {
    console.log("Usuario autenticado:", req.user); // Depura el usuario
    if (req.user && req.user.role === "admin") {
        return next();
    } else {
        return res.status(403).send("No autorizado");
    }
}

export function soloUser(req, res, next) {
    console.log("Usuario autenticado:", req.user); // Depura el usuario
    if (req.user && req.user.role === "usuario") {
        return next();
    } else {
        return res.status(403).send("No autorizado");
    }
}
