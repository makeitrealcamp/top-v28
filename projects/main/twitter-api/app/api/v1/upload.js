import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});

function fileFilter(req, file, cb) {
  const allowTypes = /jpeg|jpg|png|gif/;
  const valid = allowTypes.test(file.mimetype);

  if (valid) {
    cb(null, true);
  } else {
    cb({
      message: 'Unsupported image format',
      status: 400,
    });
  }
}

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 1_000_000,
  },
});
