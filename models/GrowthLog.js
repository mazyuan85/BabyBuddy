const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const growthLogSchema = new Schema({
    baby: {
        type: Schema.Types.ObjectId,
        ref: 'Baby',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("GrowthLog", growthLogSchema);