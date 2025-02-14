import AWS from 'aws-sdk';
import fs from 'fs';

const bucket = 'photobucket69813';

AWS.config.loadFromPath('./config.json');
const s3 = new AWS.S3();

let fileList = [];
let directorySize = 0;


async function getSize() {
    fileList = [];
    directorySize = 0;

    let params = {
        Bucket: bucket
    };
    let data = await s3.listObjects(params).promise();

    data.Contents.forEach((file) => {
        fileList = fileList.concat(file.Key);
        directorySize += 1;
    });
}

export async function fetchImageList() {
    await getSize();
    return fileList;
}

export async function fetchRandomImage() {
    let value = Math.floor(Math.random() * 10000000);
    let url = "error fetching image";

    await getSize(fileList, directorySize);

    value %= directorySize;
    let selection = fileList[value];

    if (selection !== undefined) {
        url = " https://photobucket69813.s3.amazonaws.com/" + selection
    }
    return url;

}

export async function fetchImage(fileName) {
    await getSize();
    let url = "this image cannot be found";

    for (let file in fileList) {
        if (fileList[file].toLowerCase() == fileName.toLowerCase()) {
            url = " https://photobucket69813.s3.amazonaws.com/" + fileName;
        }
    }
    return url;
}

export async function deleteImage(fileName) {
    var params = {Bucket: bucket, Key: fileName};

    let data = await s3.deleteObject(params, function (err, data) {
        if (err) return 'Error deleted file:' + err;

    }).promise();
    return 'File deleted successfully';

}

export async function uploadImage(file) {
    let message = "invalid message";
    const params = {
        Bucket: bucket,
        Key: file.originalname, // File name in S3
        Body: fs.createReadStream(file.path) // Read file stream
    };

    let data = await s3.upload(params, (err, data) => {
        if (err) message = 'Error uploading file:' + err;
    }).promise();

    message = 'File uploaded successfully: ' + data.Location;

    return message;
}
