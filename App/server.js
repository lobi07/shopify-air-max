var express = require('express');
var port = 1234;
var app = express();
var fetch = require("node-fetch");

app.listen(port, function() {
    console.log("Server is running on " + port + " port");
});

app.get("/products", async(req, res) => {
    var response = await fetch(`https://babayaga-07.myshopify.com/admin/api/2020-04/products.json`, {
        headers: {
            Accept: "application/json",
            Authorization: `Basic Zjg1Mzc3YmIyMTNhNTVkNGRjYzAwMzQ3NGFkZWU1MWU6c2hwcGFfYjQ2NDg2YTAxYzA5YzIwMWVhOGM1YTA5MDk0MjdkODk=`
        },
    });
    res.send(await response.json());
});

app.post("/orders", async(req, res) => {
    var response = await fetch(`https://babayaga-07.myshopify.com/admin/api/2020-04/orders.json`, {
        method: "post",
        body: JSON.stringify(req.body),
        headers: {
            Accept: "application/json",
            Authorization: `Basic Zjg1Mzc3YmIyMTNhNTVkNGRjYzAwMzQ3NGFkZWU1MWU6c2hwcGFfYjQ2NDg2YTAxYzA5YzIwMWVhOGM1YTA5MDk0MjdkODk=`
        },
    });
    res.send(await response.json());
    console.log(req.body);
});