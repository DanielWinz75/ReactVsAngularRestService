var express = require('express');
var app = express();
var fs = require("fs");
var __dirname = "files"


var grocery = {
    "Kartoffeln" : {
        "menge" : "1kg"
    }
 }
 
 app.get('/addGrocery', function (req, res) {
    // First read existing grocerys.
    fs.readFile( __dirname + "/" + "lebensmittel.json", 'utf8', function (err, data) {
        data = JSON.parse( data );

        const requestedGrocery = Object.keys(grocery)[0]

        data[requestedGrocery] = grocery[requestedGrocery];
        console.log( data );

        // convert JSON object to string
        const fileContent = JSON.stringify(data, null, 4);

        try {
            fs.writeFileSync(__dirname + "/" + "lebensmittel.json", fileContent);
            console.log("JSON data is saved.");
        } catch (error) {
            console.error(err);
        }

        res.end( JSON.stringify(data));
    });
 })

app.get('/listGroceries', function (req, res) {
   fs.readFile( __dirname + "/" + "lebensmittel.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})