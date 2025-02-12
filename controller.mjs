import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';

import {fetchImageList, fetchRandomImage, fetchImage, uploadImage, uploadImages} from './imageService.mjs'

const app = express();
app.use(express.json())

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

app.post('/upload/file/:fileName', asyncHandler(async (req, res) => {
    const fileName = req.params.fileName;
    await uploadImage(fileName).then(data => res.status(200).send({message: data})).catch(err => console.log(err));
}))

app.get('/upload/directory/:dirName', asyncHandler(async (req, res) => {
    const dirName = req.params.dirName;
    await uploadImages(dirName).then(data => res.status(200).send({message: data})).catch(err => console.log(err));
}))

