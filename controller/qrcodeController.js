const path = require("path");
const qrcode = require("qrcode");

exports.generateQRCode = async (text) => {
  console.log("Initializing request to generate QR code");

  let imgName = "qrcode-" + Date.now() + ".png";
  let imgPath = path.join(__dirname, "../images");

  try {
    await qrcode.toFile(`${imgPath}/${imgName}`, text, {
      color: {
        dark: "#00F",
        light: "#0000",
      },
    });

    let qrcodeSrc = imgName;

    return qrcodeSrc;
  } catch (err) {
    console.log(err);
  }
};
