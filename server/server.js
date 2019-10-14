const express = require("express");
const app = express();
const fetch = require("node-fetch");
console.log(process.env.PORT);
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

console.log(process.env.port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PORT 5000");
});

app.get("/plants", (req, res) => {
    const url = `https://trefle.io/api/plants?token=${process.env.PLANT_TOKEN}`;
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            res.redirect("/error");
        });
});

app.get("/plantByName/:plantName", (req, res, next) => {
    console.log(process.env.PLANT_TOKEN);
    const url = `https://trefle.io/api/plants?token=${process.env.PLANT_TOKEN}&q=${req.params.plantName}`;

    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            console.log("err", err);
            res.redirect("/error");
        });
});

app.listen(port, err => {
    if (err) {
        console.log(err);
    }
    console.log("Listening on port " + port);
});
