const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/";
const dbName = "mydb";

app.set("view engine", "ejs");

// Connect to MongoDB and fetch movies
app.get("/", async (req, res) => {
    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const movies = await db.collection("movies").find().toArray();
        await client.close();

        res.render("index", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving data");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
