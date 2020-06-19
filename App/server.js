var express = require('express');
var port = 1234;
var app = express();
var bodyParser = require('body-parser')
var fetch = require("node-fetch");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


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

app.get("/orders", async(req, res) => {
    var response = await fetch(`https://babayaga-07.myshopify.com/admin/api/2020-04/orders.json?status=any`, {
        headers: {
            Accept: "application/json",
            Authorization: `Basic Zjg1Mzc3YmIyMTNhNTVkNGRjYzAwMzQ3NGFkZWU1MWU6c2hwcGFfYjQ2NDg2YTAxYzA5YzIwMWVhOGM1YTA5MDk0MjdkODk=`
        },
    });
    res.send(await response.json());
});

app.post("/order", async(req, res) => {
    console.log(req.body);
    var response = await fetch(`https://babayaga-07.myshopify.com/admin/api/2020-04/orders.json`, {
        method: "post",
        body: JSON.stringify(req.body),
        headers: {
            "Accept": "application/json",
            "Authorization": `Basic Zjg1Mzc3YmIyMTNhNTVkNGRjYzAwMzQ3NGFkZWU1MWU6c2hwcGFfYjQ2NDg2YTAxYzA5YzIwMWVhOGM1YTA5MDk0MjdkODk=`,
            "Content-Type": "application/json",
        },
    });
    res.send(await response.json());
    
});
