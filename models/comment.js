var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
   text: String,
   author: {
      id: {
         // Refer to the model of the User
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Comment", commentSchema);