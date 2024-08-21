import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UsuarioModel from '../models/usuario.model.js';

const initializePassport = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies['passticketCookieToken']]),
        secretOrKey: 'passticket'
    };

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {

            const user = await UsuarioModel.findOne({ email: jwt_payload.usuario });

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
