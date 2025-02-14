import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';

import {fetchImageList, fetchRandomImage, fetchImage, uploadImage, deleteImage} from './imageService.mjs'

const app = express();
const PORT = process.env.PORT;

const storage = multer.diskStorage({})

app.use(express.json());

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
    await fetchImage(req.params.fileName).then(data => res.status(200).send({url: data})).catch(err => console.log(err));
})))

app.delete('/image/:fileName', (asyncHandler(async (req, res) => {
    await deleteImage(req.params.fileName).then(data => res.status(200).send({message: data})).catch(err => console.log(err));
})))

app.post('/image/upload', multer({storage}).single('file'), asyncHandler(async (req, res) => {
    await uploadImage(req.file).then(data => res.status(200).send({message: data})).catch(err => console.log(err));
}))