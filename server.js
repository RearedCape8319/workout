// Create an express web application object
const express = require("express");
const app = express();
app.use(
    express.urlencoded({
      extended: true
    })
);
app.use(express.json());

// Use the database for workouts
const Datastore = require("nedb");
const workouts = new Datastore({ filename: "data/workouts.db" });
workouts.loadDatabase((err) => {
    if (err != null) {
        console.log("Error loading database!")
    }
});




// Define get and post requests for database management
app.get("/api/allWorkouts", (request, response) => {
    console.log("Giving all workouts");
    response.json({ message: "All workouts" });
});

app.post("/api/storeWorkout", (request, response) => {
    console.log("Storing workout");
    console.log(request.body);
    response.json({ message: "Stored workout" });
});



// Listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});