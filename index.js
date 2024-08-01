const express = require("express");
const { connectMongoDB } = require("./connection");

const router = require("./routes/");
const userRouter = require("./routes/user");
const questionRouter = require("./routes/question");
const answerRouter = require("./routes/answer");
const commentRouter = require("./routes/comment");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connection
connectMongoDB(process.env.MONGO_URL).then(() =>
    console.log("Connected to MongoDB")
);

// Routes
app.use("/", router);
app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/answer", answerRouter);
app.use("/comment", commentRouter);

app.listen(PORT, () => {
    console.log(`App Running on port ${PORT}`);
});
