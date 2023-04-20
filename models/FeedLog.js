const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedLogSchema = new Schema({
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
        enum: ["breast", "bottle", "food", "medicine"],
        required: true,
    },
    // for breastfeeding
    duration: {
        type: Number,
        min: 0,
        max: 60,
    },
    // for bottlefeeding
    volume: {
        type: Number,
        min: 0,
        max: 300,
    },
    food: [{
        type: String,
        enum: ["fruit", "meat", "veg", "porridge", "cereal", "milk", "juice", "egg", "fish", "soup", "others"]
    }],
    medicine: {
        type: String,
        enum: ["paracetamol", "vitamins", "others",""]
    },
    remarks: {
        type: String,
        maxLength: 200,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("FeedLog", feedLogSchema);