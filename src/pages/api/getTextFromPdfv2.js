import nextConnect from "next-connect";
import multer from "multer";
import { fromPath } from "pdf2pic";
import { createWorker } from "tesseract.js";
import fs from "fs";
import nextConnect from "next-connect";


const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, "source.pdf"),
  }),
});

const options = {
  density: 100,
  saveFilename: "source",
  savePath: "./public/uploads/",
  format: "png",
  width: 794,
  height: 1123,
};
const storeAsImage = fromPath("./public/uploads/source.pdf", options);

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("theFiles"));

apiRoute.post(async (req, res) => {
  try {
    // Convert the PDF to images
    const { numberOfPages, files } = await storeAsImage.bulk();

    // Initialize Tesseract worker
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    console.log("Number of pages:", numberOfPages);
    // Perform OCR on each image
    const recognizedText = [];
    for (let i = 1; i <= numberOfPages; i++) {
      const pagePath = `./public/uploads/source_${i}.png`;
      const {
        data: { text },
      } = await worker.recognize(pagePath);
      recognizedText.push(text.trim());
    }

    await worker.terminate();

    // Delete temporary image files
    files.forEach((file) => {
      fs.unlinkSync(file);
    });

    res.status(200).json({ data: recognizedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OCR process failed." });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
