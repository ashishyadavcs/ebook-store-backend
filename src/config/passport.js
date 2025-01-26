import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import config from "./index.js";
import { Userservice } from "../services/user.js";
const userService = new Userservice();
passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_REDIRECT_URL,
        },
        async function (accessToken, refreshToken, profile, cb) {
            const { name, email } = profile._json;
            const user = await userService.findByEmail(email);
            if (user) return cb(null, user);
            const newuser = await userService.create({ email, password: "jshdfj_wjkhef_892734_" });
            return cb(null, newuser);
        }
    )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
export default passport;
