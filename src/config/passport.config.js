import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UsuarioModel from '../models/usuario.model.js';

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["passticketCookieToken"];
        console.log("Token extraído:", token); 
    }
    return token;
};


const initializePassport = () => {
    passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: 'passticket'
    }, async (jwt_payload, done) => {
        try {
            console.log("JWT Payload:", jwt_payload); // Verifica qué contiene el JWT payload
            const user = await UsuarioModel.findOne({ email: jwt_payload.email });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));
    
};

export default initializePassport;
