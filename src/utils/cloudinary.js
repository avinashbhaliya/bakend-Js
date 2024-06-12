

import {v2 as cloudinary} from  "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinay = async(localfilepath) => {
    try {
        if (!localfilepath) return null
        //upload the file on cloudinary 
         const response = cloudinary.uploader.upload(localfilepath, {
            resource_type : "auto"
        })
        console.log("file is uploaded on cloudinary", response.url);
        
    } catch (error) {
        fs.unlinkSync(localfilepath) //remove the locally  saved temporary file as the upload operetion got failed
        return null;
    }
}
