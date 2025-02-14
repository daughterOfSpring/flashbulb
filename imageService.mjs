import 'dotenv/config';
import AWS from 'aws-sdk';
import fs from 'fs';


const BUCKET = process.env.BUCKET;

AWS.config.loadFromPath('./config.json');
const s3 = new AWS.S3();

let fileList = [];
let directorySize = 0;

// Function for retrieving a list of the files inside the s3 bucket
async function getSize() {
    fileList = [];
    directorySize = 0;

    // Request parameters for the s3 call
    const params = {
        Bucket: BUCKET
    };

    let data = await s3.listObjects(params).promise();

    // Loop through the response and add each file in the bucket to a locally stored array
    data.Contents.forEach((file) => {
        fileList = fileList.concat(file.Key);
        directorySize += 1;
    });
}

// Function for returning the fileList, so it can be returned to the requesting application
export async function fetchImageList() {
    await getSize();
    return fileList;
}


// Function that retrieves the url of a random image inside the bucket
export async function fetchRandomImage() {
    let value = Math.floor(Math.random() * 10000000);
    let url = "error fetching image"; // Default string in case a response is not obtained correctly

    // Make a call to getSize to refresh the file list
    await getSize(fileList, directorySize);

    // Select a random file from the locally stored list
    value %= directorySize;
    let selection = fileList[value];

    // Catch errors in retrieving a random file
    if (selection !== undefined) {
        url = " https://photobucket69813.s3.amazonaws.com/" + selection
    }
    return url;

}

// Function that returns the url of a specifically named file in the s3 bucket
export async function fetchImage(fileName) {
    await getSize();
    let url = "this image cannot be found";

    // Iterate through the local file and create a url if a match is found
    for (let file in fileList) {
        if (fileList[file].toLowerCase() == fileName.toLowerCase()) {
            url = " https://photobucket69813.s3.amazonaws.com/" + fileName;
        }
    }
    return url;
}

// Function for deleting an object out of the s3 bucket
export async function deleteImage(fileName) {
    // Request parameters for the s3 call
    const params = {Bucket: BUCKET, Key: fileName};

    let data = await s3.deleteObject(params, function (err, data) {
        if (err) return 'Error deleted file:' + err;
    }).promise();

    return 'File deleted successfully';
}

// Function for adding a new object to the s3 bucket
export async function uploadImage(file) {
    // Request parameters for the s3 call
    const params = {
        Bucket: BUCKET,
        Key: file.originalname, // File name in S3
        Body: fs.createReadStream(file.path) // Read file stream
    };

    let data = await s3.upload(params, (err, data) => {
        if (err) return 'Error uploading file:' + err;
    }).promise();

    return 'File uploaded successfully: ' + data.Location;
}
