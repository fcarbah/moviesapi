const express = require('express');
import router from "./routes/api";

const app = express();
const port = 80;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, () => console.log(`Movie app listening on port ${port}!`));