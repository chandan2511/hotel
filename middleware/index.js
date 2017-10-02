// All the middleware goes here
var middlewareObj = {};
var Campground    = require("../models/hotel");
var Comment       = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // Check if user is Owner of Campground
     // Is User logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if (err)
        {
            // Flash message for ID not found
            req.flash("error", "Campground not found!")
            // Redirect to previous page
            res.redirect("back");
        }
        else
        {
            // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
            if (!foundCampground) {
                    req.flash("error", "Item not found");
                    return res.redirect("back");
            }
            // If logged in does user own the campground
            if(foundCampground.user.id.equals(req.user._id)){
                 next(); 
            }
            else
            {
                 // If not owner also redirect and flash a message
                req.flash("error", "You don't have permission to do that!")
                res.redirect("back");
            }
        }
        });
    }
     else
        {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    // Check if user is Owner of Comment
     // Is User logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err)
        {
            req.flash("error", "Comment not found!")
            // Redirect to previous page
            res.redirect("back");
        }
        else
        {
            // If logged in does user own the comment
            if(foundComment.author.id.equals(req.user._id)){
                 next(); 
            }
            else
            {
                 // If not owner also redirect
                req.flash("error", "You don't have the rights to do that!")
                res.redirect("back");
            }
        }
        });
    }
     else
        {
            req.flash("error", "You need to be logged in to do that!")
            res.redirect("back");
        }
}

middlewareObj.isLoggedIn = function(req, res, next){
    // CHECK IF USER IS LOGGED IN
    if (req.isAuthenticated())
    {
        return next();
    }
    // Send a flash message
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login/");
}



module.exports = middlewareObj;