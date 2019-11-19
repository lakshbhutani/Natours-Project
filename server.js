const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION:: SHUTTING DOWN.....');
  console.log(err.name, err.message);
  process.exit(1);
});

// console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connections successfull.');
  })
  .catch(err => {
    console.log(err);
  });

const app = require('./app'); // This line if placed at the top then in app.js we wont be able to access process.env.

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Hello from the server side.');
});

server.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION::SHUTTING DOWN.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

