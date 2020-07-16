const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    // ref must compliant with User model name
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    });

messageSchema.pre('remove', async function(next) {
    // find a user and remove the message from their message list
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch (e) {
        return next(e);
    }
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;