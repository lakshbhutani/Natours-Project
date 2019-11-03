const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// console.log(DB);

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

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: false
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hikesssr',
  rating: 4.7,
  price: 497
});

testTour
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log("Error :",err));

const app = require('./app'); // This line if placed at the top then in app.js we wont be able to access process.env.

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Hello from the server side.');
});
