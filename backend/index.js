import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieparser from "cookie-parser";
import {app,httpserver} from "./socketio/Server.js"
// const app = express();
dotenv.config();
const port=process.env.PORT || 5000;
const mongodb_uri=process.env.MONGODB_URI;
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:4001",
    credentials: true
  }
));
app.use(cookieparser());
try
{
    mongoose.connect(mongodb_uri);
    console.log("Connected to database");
}
catch(err)
{
    console.log(err);
}
app.use("/api/user",userRoutes);
app.use("/api/message",messageRoutes);
httpserver.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
