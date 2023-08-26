import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

type ReadableStream = Buffer | string | null;
const createReadStream = (
  object: ReadableStream,
  options?: ReadableOptions
) => {
  return new MultiStream(object, options);
};

const region = process.env.AWS_S3_BUCKET_REGION as string;

const s3Aws = new AWS.S3({
  region,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

const bucket = process.env.AWS_S3_BUCKET_NAME_TASK_MANAGER as string;

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const fileUpload = multer({
  fileFilter(_req, file, callback) {
    if (whitelist.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export const singleFileUploadMiddleware = fileUpload;

export const singleFileUpload = async (request: Request) => {
  const streamUpload = (req: Request) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinaryV2.uploader.upload_stream(
        (error: any, result: any) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      createReadStream(req.file!.buffer).pipe(stream);
    });
  };

  // https://stackoverflow.com/questions/60408575/how-to-validate-file-extension-with-multer-middleware
  // https://github.com/sindresorhus/file-type/issues/535#issuecomment-1065952695
  const { fileTypeFromStream } = await (eval('import("file-type")') as Promise<
    typeof import("file-type")
  >);
  if (!request.file) throw new Error("file not included in request");
  const stream = createReadStream(request.file.buffer);
  const meta = (await fileTypeFromStream(stream))!;
  if (!whitelist.includes(meta.mime))
    throw new Error(`${meta.mime} file is not allowed`);

  return (await streamUpload(request)) as CloudinaryImage;
};

export const multiUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
  fileFilter: function (req, file, cb: any) {
    const allowedFieldNames = ["avatar"];
    if (!allowedFieldNames.includes(file.fieldname)) {
      return cb(new Error("Invalid fieldname"), false); 
    }
    cb(null, true);
  },
});

export const uploadFile = async (file: any) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME_TASK_MANAGER as string,
    Body: fileStream,
    Key: file.filename,
  };

  return s3Aws.upload(uploadParams as any).promise();
};

