let express = require("express");
const handlers = require("./handlers");
let app = express();
var bodyParser = require("body-parser");
let cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static("/public"));

app.get("/", handlers.getHomepage);

app.get("/api/shorturl/:url", handlers.redirect);

app.post("/api/shorturl", handlers.generateUrl);

app.listen(3000, () => console.log("server listening on port 3000..."));
