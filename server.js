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
app.get("/api/getAllWorkouts", (request, response) => {
    console.log("Giving all workouts");
    workouts.find({}).sort({ target: 1, timestamp: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving all workouts");
            response.end();
        } else {
            response.json(docs);
        }
    });
});

app.post("/api/storeWorkout", (request, response) => {
    let data = request.body;
    data.timestamp = Date.now();
    workouts.insert(data, (err, newDoc) => {
        if (err != null) {
            console.log("Error storing to database!", err);
            response.end();
        } else {
            console.log("Stored new workout!", newDoc);
            response.json({ message: "Success!", record: newDoc });
        }
    });
    workouts.loadDatabase((err) => {
        if (err != null) {
            console.log("Error loading database!", err);
        }
    });
});

app.get("/api/arms", (request, response) => {
    console.log("Giving arm workouts");
    workouts.find({ target: "arms" }).sort({ timestamp: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving arm workouts");
            response.end();
        } else {
            response.json(docs);
        }
    });
});

app.get("/api/back", (request, response) => {
    console.log("Giving back workouts");
    workouts.find({ target: "back" }).sort({ timestamp: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving back workouts");
            response.end();
        } else {
            response.json(docs);
        }
    });
});

app.get("/api/chest", (request, response) => {
    console.log("Giving chest workouts");
    workouts.find({ target: "chest" }).sort({ timestamp: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving chest workouts");
            response.end();
        } else {
            response.json(docs);
        }
    });
});

app.get("/api/core", (request, response) => {
    console.log("Giving core workouts");
    workouts.find({ target: "core" }).sort({ timestamp: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving core workouts");
            response.end();
        } else {
            response.json(docs);
        }
    });
});

app.get("/api/legs", (request, response) => {
    console.log("Giving leg workouts");
    workouts.find({ target: "legs" }).sort({ timestamp: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving leg workouts");
            response.end();
        } else {
            response.json(docs);
        }
    });
});

app.get("/api/shoulders", (request, response) => {
    console.log("Giving shoulder workouts");
    workouts.find({ target: "shoulders" }).sort({ timestamp: 1 }).exec((err, docs) => {
        if (err != null) {
            console.log("Error retrieving shoulder workouts");
            response.end();
        } else {
            response.json(docs);
        }
    });
});





// Listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});