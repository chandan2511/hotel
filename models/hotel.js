var mongoose = require("mongoose");

// Step 1
// Mongoose Setup

// To ASSOCIATE the comments with the HOTELS
// Add a property Comments to campground Schema

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    user: {
        id: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User"  
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }
        ]
});


// Step 2
// Compile the Schema into a Model and connect to Mongo DB

module.exports = mongoose.model("Campground", campgroundSchema);
