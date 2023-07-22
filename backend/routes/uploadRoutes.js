// Multer Routes module

//Documentation for multer- https://www.npmjs.com/package/multer

import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

/**

MIME Type vs Extension Type Documentation:

* MIME Type:
1) MIME (Multipurpose Internet Mail Extensions) type is a standard way to identify files on the internet.
2) It is a string that represents the nature and format of a file.
3) MIME types are used by web browsers and servers to interpret and handle different file types appropriately.
4) Examples of MIME types include "text/html" for HTML files, "image/jpeg" for JPEG images, and "application/pdf" for PDF documents.

* Extension Type:
1) Extension type refers to the file extension, which is the suffix or characters after the last dot in a file name.
2) It is a short and recognizable identifier for the file format.
3) Extension types are commonly used in operating systems to associate files with specific programs or to determine their file type.
4) Examples of extension types include ".html" for HTML files, ".jpg" for JPEG images, and ".pdf" for PDF documents.


* Why Both Are Important:

Extension types are typically used in file systems to determine the file type based on the file name's extension.
MIME types provide a more reliable and accurate way to identify file types since they are determined by the file's content rather than just the extension.
Using both extension types and MIME types ensures more robust file type validation and handling.
While extension types can be easily manipulated or changed, MIME types provide a more standardized and accurate representation of the file's format.
By checking both extension types and MIME types, we can ensure that files are correctly identified and processed based on their actual content and format.

*/

function fileTypeValidator(file, cb) {
  const validTypes = /jpg|jpeg|png/;
  const match_extname = validTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const match_mimetype = validTypes.test(file.mimetype);

  // extname() is a method to get the extension from a given file
  // test returns true/false as per the match. Simply, verifying if types are as per the validFilesTypes
  if (match_extname && match_mimetype) {
    // mime type and extension type are valid acceptable formats
    return cb(null, true);
  } else {
    cb("ONLY IMAGES OF TYPE, jp,png,jpeg!");
  }
}

// fileFilter from documentation to accept specific files
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    fileTypeValidator(file, cb);
  },
});

/**
 upload.single('image'): Middleware function that specifies the field name 'image' for the single file upload.
The 'image' field represents the field name used in the request to send the file.

Request:
    Method: POST
    Body: FormData with 'image' field containing the file to upload.

Response:
    Body: The file path where the uploaded file is stored.
 */

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
