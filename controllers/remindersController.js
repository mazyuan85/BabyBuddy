const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");
require('dotenv').config();

async function sendReminders(req, res) {
  const apiKey = req.query.apikey;
  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ error: "Invalid API key" });
    return;
  }

  // Fetch appointments with reminders for today
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  try {
    const appointments = await Appointment.find({
      sendReminder: true,
      dateTime: { $gte: startOfDay, $lt: endOfDay },
    }).populate({
      path: "baby",
      model: "Baby",
      populate: {
        path: "user",
        model: "User",
        select: "email",
      }
    });

    // Send email reminders
    appointments.forEach((appointment) => {
      sendReminder(appointment);
    });

    res.status(200).json({ message: "Reminders sent" });
  } catch (error) {
    console.error("Failed to send reminders:", error);
    res.status(500).json({ error: "Failed to send reminders" });
  }
}

async function sendReminder(appointment) {
    // Configure your email transport and authentication details
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD, 
      },
    });
  
    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: appointment.baby.user.email,
      subject: `Appointment Reminder for ${appointment.baby.name}`,
      text: `Reminder: You have an appointment on ${appointment.dateTime}. Remarks (if any): ${appointment.remarks}`,
    };
  
    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
};

module.exports = {
  sendReminders,
  sendReminder,
};

