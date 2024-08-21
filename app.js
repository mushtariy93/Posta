const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const port = config.get("port") || 3030;
const app = express();
const mainRouter = require("./routes/index.router");

app.use(express.json());

app.use("/api", mainRouter);


async function start() {
    try {
        await mongoose.connect(config.get("dbUri"));

        app.listen(port, () => {
            console.log(`server started at port:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
