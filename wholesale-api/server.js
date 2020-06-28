import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { createDatabases } from './config/database';

// Routes import
import clients from './src/routes/clients';
import employees from './src/routes/employees';

const server = express();

// Create databases
createDatabases();

// Middleware
server.use(bodyParser.json());
server.use(cors());

// Port
const port = process.env.port || 3000;

// Routes config
server.use('/api/clients', clients());
server.use('/api/employees', employees());

// Server listen
server.listen(port, () => console.log(`Server is running on port ${port}`));