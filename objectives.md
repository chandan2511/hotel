# Yelp Camp

* Add a landing page
* Add `campgrounds page` that lists all campgrounds


Each campground has:
* Name
* Image

# Layout and Basic Styling


* Create a header and a footer partials
* Add in Bootstrap

# Creating new Campgrounds


* Setup new Campground post route
* Add in the Body Parser
* Setup route to show form
* Add a basic unstyled form

# Styling for Campgrounds

* Better Campgrounds styling
* Make campgrounds display in a grid

# Continue with Styling

* Add a navbar to all templates
* Style the new Campground form

# v2 Yelp Camp

# Add Mongoose to Yelp Camp

* To Start Mongod in background type ./mongod and it will start the Mongo process
* Leave the app running in background because Mongoose needs to connect

* Install and configure Mongoose
* Setup a Campground model
* Use the Campground model inside of our routes


# Create a Camp show page

* Review the RESTFUL routes we have seen so far
* Add a description to our campground model
* Show db.collections.drop();
* Add a show/route template 

# RESTFUL Routes
*  Name    URL    Method          Description                            
=========================================================================
* INDEX  - /dogs     - GET  - Display a list of all dogs                 
* NEW    - /dogs/new - GET  - Displays a form to make a new dog          
* CREATE - /dogs     - POST - Adds a new dog to DB and redirects         
* SHOW   - /dogs/:id - GET  - Shows a detailed dog page from DB          
* 

* Nested Routes
* Comments route     - /campground/:id/comments/new     GET - Show new comments form
* Create new comment - /campground/:id/comments         POST - Create a new comment

# Create a SEEDS File
*Create seeds.js
