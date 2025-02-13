import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';

import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({})

const upload = multer({storage}).single('file')

import {fetchImageList, fetchRandomImage, fetchImage, uploadImage, deleteImage} from './imageService.mjs'

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

/**
 * Function call that sets the application port number and initialises the MongoDB connection
 */
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/image/list', (asyncHandler(async (req, res) => {
    await fetchImageList().then(data => res.status(200).send({files: data})).catch(err => console.log(err));
})))

app.get('/image/random', asyncHandler(async (req, res) => {
    await fetchRandomImage().then(data => res.status(200).send({url: data})).catch(err => console.log(err));
}))

app.get('/image/:fileName', (asyncHandler(async (req, res) => {
    const fileName = req.params.fileName;
    await fetchImage(fileName).then(data => res.status(200).send({url: data})).catch(err => console.log(err));
})))

app.delete('/image/:fileName', (asyncHandler(async (req, res) => {
    const fileName = req.params.fileName;
    await deleteImage(fileName).then(data => res.status(200).send({url: data})).catch(err => console.log(err));
})))

app.post('/image/upload', upload, asyncHandler(async (req, res) => {
    const formData = req.file;
    await uploadImage(formData).then(data => res.status(200).send({message: data})).catch(err => console.log(err));
}))