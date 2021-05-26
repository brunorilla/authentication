/* Módulos requeridos */
import express from 'express';
import path from 'path';
import expressSession from 'express-session';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import dotenv from 'dotenv'
dotenv.config()
import {router} from '../auth.js';

/**
 * Variables
 */
const app = express();
const port = process.env.PORT || "8000";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 *
 * Configuración de sesión
 */
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};


if (app.get("env") === "production") {
    session.cookie.secure = true;
}

/**
 * Configuración de Passport
 */
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        /**
         * Access tokens are used to authorize users to an API
         * (resource server)
         * accessToken is the token to call the Auth0 API
         * or a secured third-party API
         * extraParams.id_token has the JSON Web Token
         * profile has all the information from the user
         */
        return done(null, profile);
    }
);


/**
 *  Configuración de App
 */
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "./public")));

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Creating custom middleware with Express
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});



app.use("/", router);
/*
GET /login
 */
app.get('/login', function (req, res) {
    res.send('<h1>Estás en la página de login</h1>');
});
/*

GET /logout
 */

/*
GET /callback
*/

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})



