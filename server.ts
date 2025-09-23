import express from "express";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.send("Hello form React Native PlayGround");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
