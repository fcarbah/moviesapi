require('dotenv').config();
import express from 'express';
import router from "./routes/api";
import DBConnector from './database/connector';
import { AuthController } from './controllers/authcontroller'

AuthController.create();

const app = express();
const port = 80;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

DBConnector.connect().then(() =>{
app.listen(port, () => console.log(`Movie api listening on port ${port}!`));
});

process.on('SIGINT', () => {
  DBConnector.disconnect();
  process.exit();
});