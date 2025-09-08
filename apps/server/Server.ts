import express from "express";
import { ConnectDB } from "./db/ConnectDB.ts";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From the server");
});
const PORT = 8001;

app.listen(PORT, () => {
  ConnectDB();
  console.log("App is runing on port 8001");
});
