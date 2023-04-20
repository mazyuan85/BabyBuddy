const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const babySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        maxLength: 100,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        min: "2020-01-01",
        required: true,
    },
    imageURL: {
        type: String,
        maxLength: 500,
    },
    completedMilestones: [{
        type: Number,
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Baby", babySchema);