import cors from 'cors';
import express from 'express';
import passport from 'passport';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import session from 'express-session';
import { v4 as uuid } from 'uuid';
import { createDatabases } from './config/database';
import { initializePassport } from './passport-config';

// Init passport authentication
initializePassport(passport);

// Routes import
import login from './src/routes/login';
import clients from './src/routes/clients';
import products from './src/routes/products';
import employees from './src/routes/employees';

const server = express();

// Create databases
createDatabases();

// Middleware
server.use(cors());
server.use(bodyParser.json());
server.use(flash());
server.use(session({
    secret: uuid(),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
server.use(passport.initialize());
server.use(passport.session());

// Port
const port = process.env.port || 3000;

// Routes config
server.use('/api/clients', clients());
server.use('/api/products', products());
server.use('/api/employees', employees());
server.use('/api/login', login(passport));

// Server listen
server.listen(port, () => console.log(`Server is running on port ${port}`));