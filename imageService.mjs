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

    await getSize(fileList, directorySize);

    if (typeof (value) == "number" && !isNaN(value)) {
        let url;
        value %= directorySize;
        let selection = fileList[value];

        if (selection !== undefined) {
            url = " https://photobucket69813.s3.amazonaws.com/" + selection
        }
        return url;
    }
}

export async function fetchImage(fileName) {
    await getSize();
    let url;

    for (let file in fileList) {
        if (fileList[file].toLowerCase() == fileName.toLowerCase()) {
            url = " https://photobucket69813.s3.amazonaws.com/" + fileName;
            return url;
        }
    }
    url = "this image cannot be found"
    return url;
}

export async function uploadImage(fileName) {

    const params = {
        Bucket: bucket,
        Key: fileName, // File name in S3
        Body: fs.createReadStream(fileName) // Read file stream
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error uploading file:', err);
            return "Failed";
        } else {
            console.log('File uploaded successfully:', data.Location);
            return "Sucess!";
        }
    });
}

export async function uploadImages(dirName) {
    const dirPath = "./" + dirName + "/"
    try {
        const dir = await fs.readdirSync(dirPath);
        for (let file of dir) {
            const filePath = dirPath + file;
            console.log(filePath)
            uploadImage(filePath)
        }
        return "Sucess!";
    } catch (error) {
        console.error('Error reading directory:', error);
        return "Failed";
    }
}
