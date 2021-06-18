const path = require("path");
const fs = require("fs");

const { AwesomeQR } = require("awesome-qr");

const createQRCanvas = async (text, logoFile) => {
  try {
    const buffer = await new AwesomeQR({
      text: text,
      size: 500,
      margin: 10,
      logoImage: logoFile,
    }).draw();

    return buffer;
  } catch {
    console.log("Error occurred while creating QR code...");
  }
};

exports.generateQRCode = async (text, filename) => {
  console.log("Initializing request to generate QR code with canvas...");

  let buffer;

  try {
    if (!filename) {
      console.log("no file here...");
      buffer = await createQRCanvas(text, filename);
    } else {
      let imgPath = path.join(__dirname, `../public/images/${filename}`);
      const logo = fs.readFileSync(imgPath);

      buffer = await createQRCanvas(text, logo);
    }

    let qrcodeSrc = "images/qrcode-" + Date.now() + ".png";

    fs.writeFileSync(`public/${qrcodeSrc}`, buffer);

    return qrcodeSrc;
  } catch (error) {
    console.log(error);
  }
};
