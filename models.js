const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Need User name"]
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;