const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccinationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    doses: [{
        type: String, 
        required: true,
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);