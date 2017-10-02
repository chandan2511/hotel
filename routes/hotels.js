var express       = require("express");
var router        = express.Router();
var Hotel         = require("../models/hotel");
var middleware    = require("../middleware");

// Index - Show all HOTELS
router.get("/", function(req, res){
    // console.log(req.user);
    Hotel.find({}, function(err, allHotels){
     if (err)
        {
            console.log(err);
            req.flash("error", "Could not find the hotels!");
            res.redirect("/");
        }
     else
        {
            // console.log("Found all campgrounds!");
            // Then render the template
            res.render("hotels/index", {hotels: allHotels}); 
        }
    })
});

//CREATE - Add new HOTEL (using the POST) to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // Get the data from the form and add it to the array
    // Use body-parser to get data from the form
    var name  = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var user  = {
      id: req.user._id,
      username: req.user.username
    };
    
    // Combine the variables into one Object
    var newHotel = {name: name, image: image, price: price, description: description, user: user};
    
    // Create a new campground and save it to the DB
    Hotel.create(newHotel, function (err, newlyCreated) {
         if (err)
         {
             console.log(err);
             req.flash("error", "Could not add the Hotel!");
             res.redirect("back");
         }
         else
         {
             console.log("Successfully added a new hotel!");
             console.log(newlyCreated);
            // redirect back to all the campgrounds page;
             res.redirect("/hotels");
         }
    });
});


// NEW - Show form to create new HOTEL
router.get("/new", middleware.isLoggedIn, function(req, res){
    // redirect back to all the campgrounds page;
    res.render("hotels/new");
});


// SHOW - Show a specific HOTEL from the DB
router.get("/:id", function(req, res){
    // POPULATE the MODELs with the actual comments of the HOTEL
    Hotel.findById(req.params.id).populate("comments").exec(function(err, foundHotel){
        if (err)
        {
            req.flash("error", "Hotel not found!");
            res.redirect("back");
        }
        else
        {
            if (!foundHotel) {
                req.flash("error", "Hotel not found!");
                res.redirect("back");
            }
             // show the information about the campground
            res.render("hotels/show", {hotel: foundHotel});
        }
    });
});

// EDIT HOTEL ROUTE
router.get("/:id/edit/", middleware.checkCampgroundOwnership, function(req, res){
        Hotel.findById(req.params.id, function(err, foundHotel){
        if (!foundHotel) {
            req.flash("error", "Hotel not found!");
            res.redirect("/hotels");
        }
        if (err)
        {
            console.log(err);
            res.redirect('back');
        }
            res.render("hotels/edit", {hotel: foundHotel}); 
        });
});

// UPDATE HOTEL ROUTE
router.put("/:id/", middleware.checkCampgroundOwnership, function(req, res){
    // Find by ID and update the correct Hotel
    Hotel.findByIdAndUpdate(req.params.id, req.body.hotel, function (err, updatedHotel) {
        if(err)
        {
            req.flash("error", "Hotel not found!");
            res.redirect("/hotels");
        }
        else
        {
             // Redirect to the Show page
             res.redirect("/hotels/" + req.params.id);
        }
    })
});

// DESTROY HOTEL ROUTE
router.delete("/:id/", middleware.checkCampgroundOwnership, function(req, res){
    // Find by ID and update the correct HOTEL
    Hotel.findByIdAndRemove(req.params.id, function (err, deletedCampground) {
        if(err)
        {
            req.flash("error", "Hotel not found!");
            res.redirect("/hotels");
        }
        else
        {
             // Redirect to the Show page
             res.redirect("/hotels");
        }
    })
});

module.exports = router;