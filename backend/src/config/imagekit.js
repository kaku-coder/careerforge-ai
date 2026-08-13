import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

/**
 * Uploads a file buffer to ImageKit
 * @param {Buffer} fileBuffer - The buffer of the file to upload
 * @param {string} fileName - Original filename or custom name
 * @param {string} folder - Destination folder in ImageKit (default: "/resumes")
 * @returns {Promise<Object>} ImageKit upload response object (fileId, url, name, etc.)
 */
export const uploadToImageKit = async (fileBuffer, fileName, folder = "/uploads") => {
    try {
        const response = await imagekit.upload({
            file: fileBuffer.toString("base64"), // base64 string works reliably across all ImageKit SDK versions
            fileName: `${Date.now()}_${fileName}`,
            folder: folder
        });
        return response;
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw new Error("Failed to upload file to ImageKit: " + error.message);
    }
};

export default imagekit;
