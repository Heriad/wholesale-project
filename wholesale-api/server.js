import express from 'express';
import bodyParser from 'body-parser';

// Routes import
import users from './src/routes/users';

const server = express();

// Middleware
server.use(bodyParser.json());

// Port
const port = process.env.port || 3000;

// Routes config
server.use('/api/users', users());

// Server listen
server.listen(port, () => console.log(`Server is running on port ${port}`));