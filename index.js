const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Todos API",
            description: "An api to create todo request based on database mongodb",
            version: "1.0.0",
            contact: {
                name: "Girard Paul",
                email: "paul.girard1@viacesi.fr"
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["./swagger/configuration.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
mongoose.connect('mongodb+srv://root:root@todolist.jzo3b.mongodb.net/todolist?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true,  autoIndex: true});

var db = mongoose.connection;

!db ? console.log("Error connecting db") : console.log("Db connected successfully")

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));