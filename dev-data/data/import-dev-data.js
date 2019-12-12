const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));
console.log(tours);

// Importing data to DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Deleting Data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data Deleted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
