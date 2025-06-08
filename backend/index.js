import express from 'express';
import bookingFormRoute from './routes/bookingForm.route.js';
import connectDB from './lib/connectDB.js';
import cors from 'cors';

const app=express();

app.use(express.json());
app.use(cors(process.env.CLIENT_URL));
app.use("/booking", bookingFormRoute);
app.use((error, req, res, next) => {
  res.status(error.status??500);
  res.json({
    message: error.message??'Something went wrong!',
    status: error.status,
    stack: error.stack,
  });
});


app.listen(3000, () => {
  connectDB();
  console.log('server running');
});