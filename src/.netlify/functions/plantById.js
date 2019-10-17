const fetch = require("node-fetch").default;
const dotenv = require("dotenv");
dotenv.config();

exports.handler = function(event, context, callback) {
    //console.log("EVENT", event);
    // your server-side functionality
    const token = process.env.PLANT_TOKEN;
    const url = `https://trefle.io/api/plants/${event.queryStringParameters.id}?token=${token}`;

    return fetch(url)
        .then(res => {
            //console.log(res.json());
            return res.json();
        })
        .then(data => ({
            statusCode: "200",
            body: JSON.stringify(data)
        }))
        .catch(err => {
            console.log("FUNCTION ERROR", err);
            return { statusCode: "422", body: String(err) };
        });
};
