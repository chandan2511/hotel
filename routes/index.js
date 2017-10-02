var express       = require("express");
var router        = express.Router();
var passport      = require("passport");
var User          = require("../models/user");

// ===============================
//          ROUTES
// ===============================

// Root route
router.get("/", function(req, res){
   res.render("home"); 
});

// ============================================================
//                      AUTH ROUTES
// ============================================================

// Register user form route

router.get("/register/", function(req, res){
    res.render("register");
});

// Create a new user and save it to DB
router.post("/register/", function(req, res){
        //   console.log(req.body.username);
        //   console.log(req.body.password);
        var newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function(err, user){
            
           if(err){
             req.flash("error", err.message);
             return res.redirect("/register");
           }
           
          passport.authenticate("local")(req, res, function(){
          req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username + "!");
          res.redirect("/hotels"); 
       });
   });
});

// Login form route
router.get("/login/", function(req, res){
    res.render("login");
});

// Login user via DB
router.post("/login/", passport.authenticate("local", {
    successRedirect: "/hotels",
    failureRedirect: "/login/"
}), function(req, res){
   res.render('login'); 
});

// Logout route
router.get("/logout/", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out!");
    res.redirect("/hotels");
});

module.exports = router;