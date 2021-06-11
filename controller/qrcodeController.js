const path = require("path");
const fs = require("fs");

const { AwesomeQR } = require("awesome-qr");

exports.generateQRCode = async (text, filename) => {
  console.log("Initializing request to generate QR code with canvas...");
  try {
    let imgPath = path.join(__dirname, `../public/images/${filename}`);
    const logo = fs.readFileSync(imgPath);

    const buffer = await new AwesomeQR({
      text: text,
      size: 500,
      margin: 10,
      logoImage: logo,
    }).draw();

    let qrcodeSrc = "images/qrcode-" + Date.now() + ".png";

    fs.writeFileSync(`public/${qrcodeSrc}`, buffer);

    return qrcodeSrc;
  } catch (error) {
    console.log(error);
  }
};
