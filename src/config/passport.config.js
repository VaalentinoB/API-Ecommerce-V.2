import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UsuarioModel from '../models/usuario.model.js';

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['passticketCookieToken'];
        console.log("Token JWT extraído de la cookie:", token);  // Verifica que la cookie contenga el JWT
    }
    return token;
};


const initializePassport = () => {
    passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: 'passticket'
    }, async (jwt_payload, done) => {
        try {
            
            const user = await UsuarioModel.findOne({ email: jwt_payload.email });
            if (user) {
                
                return done(null, user);
            } else {
                console.log("Usuario no encontrado");
                return done(null, false);
            }
        } catch (error) {
            console.error("Error en Passport JWT:", error);
            return done(error, false);
        }
    }));
    
    
};

export default initializePassport;
