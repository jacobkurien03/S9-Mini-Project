import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import fileUpload from "express-fileupload";
import path from 'path'
const app = express();
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

import { dirname } from 'path';

// Create a new instance of the S3 bucket object with the correct user credentials
const s3 = new aws.S3({
  accessKeyId: `AKIARPHU3M5JO4HVPBNW`,
  secretAccessKey: `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`,
  Bucket: "Amazingbucket",
});

// Setup the congifuration needed to use multer
const upload = multer({
  // Set the storage as the S3 bucker using the correct configuration
  storage: multerS3({
    s3,
    acl: "public-read", // public S3 object, that can be read
    bucket: "Amazingbucket", // bucket name
    key: function (req, file, cb) {
      // callback to name the file object in the S3 bucket
      // The filename is prefixed with the current time, to avoid multiple files of same name being uploaded to the bucket
      cb(null, `${new Date().getTime()}__${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5000000, // maximum file size of 5 MB per file
  },

  // Configure the list of file types that are valid
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|webp|svg)$/)) {
      return cb(new Error("Unsupported file format"));
    }
    cb(undefined, true);
  },
});

// router.post('/', upload.single('image'), (req, res) => {
// 	if (req.file) res.send(req.file.location);
// 	else {
// 		res.status(401);
// 		throw new Error('Invalid file type');
// 	}
// });

router.post("/", (req, res) => {
  console.log("hi");
  const img_name = Date.now() + req.body.filename;
  //console.log(Date.now());
  const file = req.files.file;
  
  const newpath = process.cwd()+"/backend/routes" + "/Images/";
  
  console.log(path.join(process.cwd()+"/backend/routes", "/Images/"))
  console.log(img_name)
  // if (req.files) {
  //   let coverImage = req.files.image;
  //   console.log(coverImage)
  // 	let coverName = Date.now();
  // 	coverImage.mv("/images/" + coverImage.name);
  // 	let img = "/images/" + coverImage.name
  // 	res.send(img);
  file.mv(`${newpath}${img_name}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(img_name);
  // }
  // else {
  // 		  res.status(401);
  // 		  console.log('Invalid file type');
  // 		  throw new Error('Invalid file type');
  // 	  }
  // file.mv(`${newpath}${img_name}`,(err)=>{
  // 	if(err){
  // 		console.log(err)
  // 	}
  // })
});

export default router;
