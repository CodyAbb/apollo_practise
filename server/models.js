const mongoose, {Schema} = require("mongoose");

const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    postName: String,
    bookCollection: [],
})

const User = mongoose.model('user', userSchema)

module.exports = {
    User
}