export function soloAdmin(req, res, next) {
    if (req.user && req.user.role === "admin") {
        return next(); 
    } else {
        return res.status(401).send("No autorizado"); 
    }
}

export function soloUser(req, res, next) {
    if (req.user && req.user.role === "usuario") {
        return next(); 
    } else {
        return res.status(403).send("No autorizado"); 
    }
}
