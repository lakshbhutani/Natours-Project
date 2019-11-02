const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');

// Middlewares
app.use(express.json());

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Hello from middle ware Laksh bhutani 🙋');
  next();
});

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString() + '😜';
  next();
});
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
// app.get('/api/v1/tours', getTour);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateExistingTour);
// app.delete('/api/v1/tours/:id', deleteTour);
