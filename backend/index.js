import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use(cors());
app.use(express.json());
app.use("/books", booksRoute);

// establish connection to the database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    // if the database connection is successful, start the server
    app.listen(PORT, () => {
      console.log(`app is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// default route
app.get("/", (req, res) => {
  return res.status(234).send("welcome to the webpage");
});
