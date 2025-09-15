import multer from 'multer';
import path from "path";
import fileSystem from 'fs';
import { fileURLToPath } from "url";

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadsDirectory = path.resolve( __dirname, '../../../../../public/uploads');

    if (!fileSystem.existsSync(uploadsDirectory)) {
      fileSystem.mkdirSync(uploadsDirectory, { recursive: true });
    }

    req.uploadsBaseDirectory = '/uploads';

    callback(null, uploadsDirectory);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  }
})

const fileFilter = (req, file, callback) => {
  const allowedExtensions = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedExtensions.includes(file.mimetype)) {
    return callback(new Error('Only JPEG, PNG and WebP images are allowed'));
  } else {
    callback(null, true);
  }
}

const limits = {
  fileSize: 5 * 1024 * 1024,
}

const upload = multer({ storage, fileFilter, limits });

export const imagesHandlerMiddleware = upload.array('images', 5);