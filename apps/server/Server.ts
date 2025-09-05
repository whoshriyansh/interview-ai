import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From the server");
});
const PORT = 8001;

app.listen(PORT, () => {
  console.log("App is runing on port 8001");
});
