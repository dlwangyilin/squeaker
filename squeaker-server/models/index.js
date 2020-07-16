const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;  // return Promise for async

mongoose.connect("mongodb://localhost/squeaker", {
    keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");

