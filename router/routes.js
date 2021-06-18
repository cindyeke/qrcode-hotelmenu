const express = require("express");
const router = express.Router();
const multer = require("multer");

const qrcode = require("../controller/qrcodeController");

const DIR = "./public/images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", (req, res) => {
  let message = "";

  const queryparam = req.query.notvalid;

  if (queryparam === "000") message = "Input URL";

  let imgsrc = "";
  res.render("index", { imgsrc, message });
});

router.post("/generateqrcode", upload.single("file"), (req, res) => {
  let message = "";
  let imgsrc;

  const url = req.body.url;
  const logoFile = req.file;

  if (url.length === 0) return res.redirect("/?notvalid=" + "000");

  try {
    (async () => {
      if (!logoFile) {
        console.log("Image Logo not inputted");
        imgsrc = await qrcode.generateQRCode(url, null);
      } else {
        console.log("Image Logo inputted");
        imgsrc = await qrcode.generateQRCode(url, logoFile.filename);
      }

      console.log("Successfully generated QR Code...");
      res.render("index", { imgsrc, message });
    })();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
