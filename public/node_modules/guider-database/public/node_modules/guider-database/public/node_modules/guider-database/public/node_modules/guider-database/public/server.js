const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 5000;

const apiKeys = {
    publicKey: "BPgYZ9De0y0m5GK3Ym2ZpjFKQ5gBUgpN9AohGY-AyS5ny2Eb-JvuEZNE9x7UHdL13AE1DII1dxXkq0Dd9aEHNJQ",
    privateKey: "pNoGEuzXdY8l3Hr1qg7VFBBFSgm34cWy82rpwRFwouk"
}

webpush.setVapidDetails(
    'mailto:vanamayaswanth1@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "Hello world");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})