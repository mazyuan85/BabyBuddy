const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sleepLogSchema = new Schema({
    baby: {
        type: Schema.Types.ObjectId,
        ref: "Baby",
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
    },
    remarks: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("SleepLog", sleepLogSchema);