const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diaperLogSchema = new Schema({
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
        enum: ["pee", "poo"]
    },
    remarks: {
        type: String,
        maxLength: 200
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("DiaperLog", diaperLogSchema);