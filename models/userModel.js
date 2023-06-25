const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        index: true,
    },
    lastname: {
        type: String,
        required: true,
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
    address: {
        type: String,
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true,
});

// Encrypt password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bycrypt.genSaltSync(10);
    this.password = await bycrypt.hashSync(this.password, salt);
})

// Check if password matches
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex"); 
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; 
    return resetToken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);