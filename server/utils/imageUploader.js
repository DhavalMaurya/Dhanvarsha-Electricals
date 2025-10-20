import cloudinary from "../config/cloudinary.js"
import streamifier from "streamifier"

const imageUploader = (file) => {

    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(result);
            }
        })
        streamifier.createReadStream(file.buffer).pipe(stream)
    });

}

export default imageUploader;