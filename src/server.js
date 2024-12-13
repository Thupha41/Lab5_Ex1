import express from "express";
import initApiRoute from "./routes/api";
const app = express();
const port = 3000;
const hostname = "localhost";
//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Khai bao api route
initApiRoute(app);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
