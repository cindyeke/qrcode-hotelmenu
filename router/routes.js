const express = require("express");
const router = express.Router();

// const qrCode = require("qrcode");

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
