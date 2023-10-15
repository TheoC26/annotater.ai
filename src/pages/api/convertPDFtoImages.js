// pages/api/convertPdfToImages.js
import multer from "multer";
import { promises as fsPromises } from "fs";
import path from "path";
import { Router } from "express";
import pdf from "pdf-poppler";
import sharp from "sharp";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const api = Router();

api.post(upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = req.file.buffer;
    const tempDir = path.join(__dirname, "../../public/temp");

    // Create a temporary directory if it doesn't exist
    await fsPromises.mkdir(tempDir, { recursive: true });

    // Generate a unique filename for the PDF
    const pdfFileName = `${Date.now()}_${req.file.originalname}`;
    const pdfFilePath = path.join(tempDir, pdfFileName);

    // Save the uploaded PDF file
    await fsPromises.writeFile(pdfFilePath, buffer);

    // Convert PDF to images using pdf-poppler
    const pdfOptions = {
      format: "jpeg",
      out_dir: tempDir,
      out_prefix: "page_",
      page: null, // Convert all pages
    };

    await pdf.convert(pdfFilePath, pdfOptions);

    // Read the generated images and send them as a response
    const imagePaths = [];
    const imageCount = pdfOptions.page || 1;

    for (let i = 1; i <= imageCount; i++) {
      const imagePath = path.join(tempDir, `page_${i}.jpeg`);
      imagePaths.push(imagePath);
    }

    const images = await Promise.all(
      imagePaths.map(async (imagePath) => {
        const imageBuffer = await fsPromises.readFile(imagePath);
        return imageBuffer;
      })
    );

    // Cleanup: Delete the temporary PDF and images
    await fsPromises.unlink(pdfFilePath);
    await Promise.all(
      imagePaths.map((imagePath) => fsPromises.unlink(imagePath))
    );

    res.status(200).json({ images });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default api;
