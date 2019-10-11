const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fetch = require("node-fetch");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PORT 5000");
});

app.get("/plant", (req, res) => {
    const token = "ckh2QlpiWmFyeWlscis1cTRYbnJVUT09";
    const url = `https://trefle.io/api/plants?token=${token}`;
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

app.listen(port, err => {
    if (err) {
        console.log(err);
    }
    console.log("Listening on port " + port);
});
