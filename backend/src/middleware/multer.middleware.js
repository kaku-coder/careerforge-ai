import multer from "multer";

// Use Memory Storage so uploaded files are stored in memory buffers
// This makes it seamless to send buffers to ImageKit or process with PDF parsers
const storage = multer.memoryStorage();

// File filter for allowed file types (PDF, DOC, DOCX, Images)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/pdf",
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PDF, DOC, DOCX, PNG, and JPG/JPEG files are allowed."), false);
    }
};

// Multer upload instance (Max file size: 10MB)
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB limit
    }
});

/**
 * Middleware wrapper for uploading a single file with field name 'file', 'resume', or 'image'
 */
export const uploadSingle = (fieldName = "file") => (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: `Multer Error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
};

export default upload;
