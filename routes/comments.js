var express = require("express");
// To send the ID from the CAMPGROUND to the comment ROUTE
var router        = express.Router({mergeParams: true});
var Hotel         = require("../models/hotel");
var Comment       = require("../models/comment");
var middleware    = require("../middleware");


// ============================================================
//                      COMMENTS ROUTES
// ============================================================

// Comments New Form
router.get("/new", middleware.isLoggedIn, function(req, res){
    // Find campground by ID
    Hotel.findById(req.params.id, function(err, hotel){
       if (err)
       {
           req.flash("error", "Hotel not found!");
           console.log(err);
       }
       else
       {
            // Render the template
              res.render("comments/new", {hotel: hotel});
       }
    });
});

// Create a comment and save it to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // Lookup Hotel using ID
     Hotel.findById(req.params.id, function(err, hotel){
       if (err)
       {
           req.flash("error", "Hotel not found!");
           console.log(err);
           res.redirect("/hotels/");
       }
       else
       {
        //   console.log(req.body.comment);
        Comment.create(req.body.comment, function(err, comment) {
            if (err)
            {
                console.log(err);
                req.flash("error", "Something went wrong!");
                res.redirect("back");
            }
            else
            {
                    
                   // Create a new comment
                //   Add Username and ID to the comment
                // console.log("New comment's username is: " + req.user.username);
                comment.author.id       = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                hotel.comments.push(comment);
                hotel.save();
                console.log(comment);
                req.flash("success", "Successfully added comment")
                // Redirect to campground Show page
                res.redirect("/hotels/" + hotel._id);
            }
            
        });
       }
       });
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit/", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err)
        {
            req.flash("error", "Comment not found!");
            console.log(err);
            res.redirect("back");
        } 
        else {
        res.render("comments/edit", {comment: foundComment, 
        hotel_id: req.params.id });
        }
    });
});

// UPDATE AN EDITED COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,
     function (err, updatedComment) {
        if(err)
        {
            req.flash("error", "Something went wrong!");
            console.log(err);
            res.redirect("back");
        }
        else
        {
             // Redirect to the Show page
             res.redirect("/hotels/" + req.params.id);
        }
     });
});

// DELETE COMMENT ROUTE
router.delete("/:comment_id/", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function (err, deletedComment) {
        if(err)
        {
            req.flash("error", "Something went wrong!");
            console.log(err);
            res.redirect("back");
        }
        else
        {
             req.flash("success", "Deleted the comment!");
             // Redirect to the Show page
             res.redirect("/hotels/" + req.params.id);
        }
    });
});

module.exports = router;