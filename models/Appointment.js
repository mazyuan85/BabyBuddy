const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    baby: {
        type: Schema.Types.ObjectId,
        ref: "Baby",
    },
    dateTime: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["vaccination", "medical"],
    },
    remarks: {
        type: String,
    },
    sendReminder : {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);