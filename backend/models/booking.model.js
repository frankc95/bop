import {Schema} from "mongoose";
import mongoose from "mongoose";

const questionAnswerSchema=new Schema({
  questionId: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  answer: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const bookingSchema=new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionAnswerSchema],
    default: [],
  },
},
  {timestamps: true}
);

export default mongoose.model('BookingForm', bookingSchema);