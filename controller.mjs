import 'dotenv/config';
import express from 'express';
import {generateImageSource, generateNumber, readFile} from './imageService.mjs'

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

/**
 * Function call that sets the application port number and initialises the MongoDB connection
 */
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/randomImage', (req, res) => {
    generateImageSource(generateNumber());
    res.status(200).send({filepath: readFile()})
})

app.get('/randomImage/:number', (req, res) => {
    generateImageSource(req.params.number);
    res.status(200).send({filepath: readFile()})
})