import "dotenv/config";

import express from "express";
import userRouter from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";
import { verifyUser } from "./middlewares/verify-users.js";


// import dotenv from "dotenv";
// dotenv.config();


const PORT = Number(process.env.PORT || 4000);

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello Server, from Sandhya (:)"
    });
});

app.use("/api/auth", userRouter)
app.use("/api/images", verifyUser, imageRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})



