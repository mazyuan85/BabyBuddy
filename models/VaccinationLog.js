const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccinationLogSchema = new Schema({
    baby: {
        type: Schema.Types.ObjectId,
        ref: "Baby",
        required: true,
    },
    vaccination: {
        type: Schema.Types.ObjectId,
        ref: "Vaccination",
        required: true,
    },
    dose: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("VaccinationLog", vaccinationLogSchema);