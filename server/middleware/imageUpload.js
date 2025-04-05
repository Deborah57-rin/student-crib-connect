
const cloudinary = require("../config/cloudinary");
const { PassThrough } = require("stream");

const uploadImagesMiddleware = async (req, res, next) => {
  try {
    // Check if files exist in the request
    if (!req.files || req.files.length === 0) {
      req.cloudinaryUrls = []; // No files uploaded
      return next();
    }

    // Upload each file using streams
    const uploadPromises = req.files.map(async (file) => {
      // Create a PassThrough stream to pipe the file buffer
      const passThroughStream = new PassThrough();
      passThroughStream.end(file.buffer); // Pipe the buffer into the stream

      // Upload the stream to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto", // Automatically detect file type (image/video)
            folder: "images", // Folder in Cloudinary
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        // Pipe the file stream to Cloudinary
        passThroughStream.pipe(uploadStream);
      });

      return result.secure_url; // Return the Cloudinary URL
    });

    // Wait for all uploads to complete
    const cloudinaryUrls = await Promise.all(uploadPromises);

    // Attach the Cloudinary URLs to the request object
    req.cloudinaryUrls = cloudinaryUrls;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in uploadImagesMiddleware:", error);
    return res.status(500).json({ error: "Failed to upload images." });
  }
};

module.exports = { uploadImagesMiddleware };