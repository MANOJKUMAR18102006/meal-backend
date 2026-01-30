const mongoose = require("mongoose")

const mealSchema = new mongoose.Schema(
    {
        week: {
            type: String,
            required: true,
        },
        day: {
            type: String,
            required: true,
        },
        breakfast: {
            type: String,
            required: true,
        },
        lunch: {
            type: String,
            required: true,
        },
        dinner: {
            type: String,
            required: true,
        },
        createdby:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("meals", mealSchema);
