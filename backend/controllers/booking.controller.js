// export const sendBookingForm=async (req, res) => {
//   console.log(req);
//   const newBookingForm=new BookingModel(req.body);

//   const bookingForm=await newBookingForm.save();
//   res.status(200).json(bookingForm);
// };

// import {sendEmail} from "../utils/email.js";
import BookingModel from "../models/booking.model.js";
import {sendBookingConfirmationEmail} from "../services/emailService.js";

export const sendBookingForm=async (req, res, next) => {
  try
  {
    const newBooking=new BookingModel(req.body);
    const booking=await newBooking.save();

    // const pdfPath=path.resolve("backend/assets/JB.CV.pdf");
    // const pdfBuffer=await fs.readFile(pdfPath);

    // const pdfAttachment=[
    //   {
    //     filename: "test.pdf",
    //     content: pdfBuffer,
    //     contentType: "application/pdf",
    //   },
    // ];

    // // 📧 Send email to user
    // await sendEmail({
    //   to: booking.email,
    //   subject: "Thanks for your booking!",
    //   html: `<p>Hi ${booking.firstName}, thank you for your booking. Please find attached our info pack.</p>`,
    //   attachments: pdfAttachment,
    // });

    // // 📧 Notify business owner
    // await sendEmail({
    //   to: process.env.BUSINESS_OWNER_EMAIL,
    //   subject: `New booking from ${booking.firstName} ${booking.lastName}`,
    //   html: `<p>A new booking has been submitted. Check the dashboard or database for details.</p>`,
    //   attachments: pdfAttachment,
    // });

    await sendBookingConfirmationEmail(booking);

    res.status(200).json(booking);
  } catch (error)
  {
    next(error);
  }
};
