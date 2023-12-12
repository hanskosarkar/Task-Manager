const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./db/connectdb');
require('dotenv').config();
const tasks_routes = require('./routes/tasks_routes');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const port = process.env.PORT || 5000;

// body parser
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("server connected...");
});

// routes
app.use('/api/v1/tasks', tasks_routes);

app.use(notFound);
app.use(errorHandler);

// first connect to database and if successfull start the server
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
