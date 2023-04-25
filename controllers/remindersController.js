const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");
require('dotenv').config();
const dayjs = require("dayjs")

async function sendReminders(req, res) {
  // Verify if api key is correct
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
      // Find appointments greater/than equal to start of day and less than end of day
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
    // Email transport and authentication details
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
      text: `Reminder: You have a ${appointment.type} appointment for ${appointment.baby.name} at ${dayjs(appointment.dateTime).format("h:mm A, DD/MM/YYYY")}. Remarks (if any): ${appointment.remarks}`,
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

