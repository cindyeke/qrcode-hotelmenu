const express = require("express");
const app = express();

const PORT = process.env.PORT || 8100;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("images"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", require("./router/routes"));

app.listen(PORT, () => {
  console.log("Hotel QR Generator running on PORT " + PORT);
});
