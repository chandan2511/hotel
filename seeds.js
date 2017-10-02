var mongoose   = require("mongoose");
var Hotel      = require("./models/hotel");
var Comment    = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest",
        image: "images/camp1.jpg",
        description: "Great place",
        price: 60.44
    },
    {
        name: "Desert Paradise",
        image: "images/camp2.jpg",
        description: "Great place",
        price: 65.44
    },
    {
        name: "Special Rest",
        image: "images/camp3.jpg",
        description: "Great place",
        price: 70.77
    }
    ];

function seedDB(){
    Hotel.remove(function(err, removed){
          if (err)
         {
          console.log(err);
        }
         else
         {
             console.log("Removed Hotels");
                 //   Add a few Hotels
                 data.forEach(function (seed) {
                 Hotel.create(seed, function(err, hotel){
                   if(err)
                  {
                  console.log(err);
                      }
                  else
                     {
                         console.log("Added a Hotel");
                             
                      // Add a few comments;
                         Comment.create(
                          {
                           text: "This is a lovely place!",
                           author: "Homer"
                          }, function (err, comment) {
                                 if(err)
                                  {
                                    console.log(err);
                                   }
                                 else
                                 {
                                     hotel.comments.push(comment);
                                     hotel.save();
                                     console.log("Created a new comment");
                                 }
                          }
                        );
                     }    
                    });
         });
         }
      });
}

module.exports = seedDB;