import multer from "multer";
//import { fileURLToPath } from 'url';

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/avatar");
  },
  filename: (req, file, cb) => {
    //console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `avatar_${req.body.firstName.toLowerCase()}_${req.body.lastName.toLowerCase()}_${Date.now()}.${ext}`
    );
  },
});

const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/product-pictures");
  },
  filename: (req, file, cb) => {
    //console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `avatar_${req.body.title.toLowerCase()}_${req.body.category.toLowerCase()}_${Date.now()}.${ext}`
    );
  },
});

const avatarFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];
  if (ext === "png" || ext === "jpeg" || ext === "jpg" || ext === "webp") {
    cb(null, true);
  } else {
    cb(
      new Error("Error: Only .png, .jpg, .webp and .jpeg format are allowed."),
      false
    );
  }
};

const avatarUpload = multer({
  storage: avatarStorage,
  //limits: { fileSize: 5000000 },
  //fileFilter: avatarFilter,
});

const pictureUpload = multer({
  storage: pictureStorage,
  //limits: { fileSize: 5000000 },
  //fileFilter: avatarFilter,
});

export { avatarUpload, pictureUpload };
