import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import PostSchema from "../mongodb/models/Post.js";

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const router = express.Router();

// Get All Post
router.route('/').get(async (req, res) => {
    try {
        const posts = await PostSchema.find({});
        
        res.status(200).json({success: true, data: posts})
    } catch (error) {
        res.status(500).json({success: true, message: error})
    }
});
// Create a POST
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = await req.body.form
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await PostSchema.create({
            name,
            prompt,
            photo: photoUrl.url
        })

        res.status('200').json({ success: true, data: newPost })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})
export default router;