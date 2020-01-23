require('dotenv').config();
import express from 'express';
import router from "./routes/api";
import DBConnector from './database/connector';
import { AuthController } from './controllers/authcontroller'


const app = express();
const port = 80;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

DBConnector.connect().then(() =>{
  AuthController.create();
  app.listen(port, () => console.log(`Movie api listening on port ${port}!`));
}).catch(error =>{
  console.log('error connecting to db! Exiting app');
  process.exit();
});

process.on('SIGINT', () => {
  DBConnector.disconnect();
  process.exit();
});