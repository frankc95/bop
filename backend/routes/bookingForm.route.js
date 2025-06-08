import express from 'express';
import {sendBookingForm} from '../controllers/booking.controller.js';

const router=express.Router();

router.post("/", sendBookingForm);

export default router;