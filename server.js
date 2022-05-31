// Create an express web application object
const express = require("express");
const app = express();
app.use(
    express.urlencoded({
      extended: true
    })
);
app.use(express.json());
app.use(express.static("public"));

// Use the database for workouts
const Datastore = require("nedb");
const workouts = new Datastore({ filename: "data/workouts.db", autoload: true });



// Define get and post requests for database management
app.get("/api/allWorkouts", (request, response) => {
    console.log("Giving all workouts");
    workouts.find({}).sort({ target: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving all workouts");
        } else {
            response.json(docs);
        }
    });
});

app.post("/api/storeWorkout", (request, response) => {
    let data = request.body;
    workouts.insert(data, (err, newDoc) => {
        if (err != null) {
            console.log("Error storing to database!", err);
        } else {
            console.log("Stored new workout!", newDoc);
            response.json({ message: "Success!", record: newDoc });
        }
    });
});



// Listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});