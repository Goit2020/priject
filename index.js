const startServer = require('./src/server');
const db = require('./src/db');
require('dotenv').config();

const port = process.env.PORT || 3000;

db()
  .then(() => {
    startServer(port);
    console.log(`Server started on PORT ${port}`);
  })
  .catch(err => console.log(`Server is not running. ${err.message}`));
