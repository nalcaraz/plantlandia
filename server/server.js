const express = require("express");
const app = express();
const fetch = require("node-fetch");
console.log(process.env.PORT);
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const token = process.env.PLANT_TOKEN;
console.log(process.env.port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PORT 5000");
});

// app.get("/plants", (req, res) => {
//     const url = `https://trefle.io/api/plants?token=${token}`;
//     fetch(url)
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             res.send({ data });
//         })
//         .catch(err => {
//             res.redirect("/error");
//         });
// });

app.get("/plantByName/:plantName", (req, res, next) => {
    const url = `https://trefle.io/api/plants?token=${token}&q=${req.params.plantName}`;

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

app.get("/plant/:id", (req, res, next) => {
    const url = `https://trefle.io/api/plants/${req.params.id}?token=${token}`;

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
