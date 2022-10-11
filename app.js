import express from "express";
import appRouter from "./src/routers/app.routes.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static('public'));

app.use('/', appRouter);

app.listen(PORT, () => {
    console.log("Server on listening http://localhost:8080")
});


