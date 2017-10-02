var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var flash          = require('connect-flash');
var passport       = require("passport");
var LocalStrategy  = require("passport-local");
var methodOverride = require("method-override");
var Hotel          = require("./models/hotel");
var Comment        = require("./models/comment");
var User           = require("./models/user");
var seedDB         = require("./seeds");
var commentRoutes  = require("./routes/comments");
var hotelRoutes    = require("./routes/hotels");
var indexRoutes    = require("./routes/index");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp', { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
// To include the public folder
// and to set up EJS
app.use(express.static("public"));
// Override POST _method to become PUT or DELETE method
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
// Seed the database with the IDs


// ===============================
//          PASSPORT CONFIG
// ===============================

app.use(require("express-session")({
    secret: "This my secret Hash check!",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ====================================================
// CREATE A LOCAL VARIABLE FOR THE CURRENT LOGGED USER
// Then you can use it in every EJS template with
// <%= currentUser.username %>
// ====================================================

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

// ====================================================
// INCLUDE THE ROUTES FROM THE ROUTES DIR
// ====================================================

app.use("/", indexRoutes);
app.use("/hotels/:id/comments", commentRoutes);
// Add /hotels in front of all hotels routes
app.use("/hotels", hotelRoutes);

// ====================================================
//                  ROUTES END
// ====================================================

// Listen for requests!

app.listen('3000', '127.0.0.1', function () {
  console.log('Hotel Booking Server has started! \n at address http://localhost:3000/');
})