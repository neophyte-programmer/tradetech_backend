const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: [],
    },
    // address: {
    //     type: String,
    // },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],

}, {
    timestamps: true,
});

// Encrypt password
userSchema.pre("save", async function (next) {
    const salt = await bycrypt.genSaltSync(10);
    this.password = await bycrypt.hashSync(this.password, salt);
})

// Check if password matches
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);