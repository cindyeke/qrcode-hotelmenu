const express = require("express");
const router = express.Router();

const qrcode = require("../controller/qrcodeController");

router.get("/", (req, res) => {
  let imgsrc = "";
  res.render("index", { imgsrc });
});

router.post("/generateqrcode", (req, res) => {
  const url = req.body.url;

  if (url.length === 0) res.send("Empty URL!");

  (async () => {
    let imgsrc = await qrcode.generateQRCode(url);
    console.log("QR Code generated and ready for download");

    res.render("index", { imgsrc });
  })();
});

module.exports = router;
