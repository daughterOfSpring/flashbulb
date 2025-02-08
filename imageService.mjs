import fs from 'node:fs';
import path from 'node:path';

const dir = "./img";
const filepath = './text.txt'

let directorySize;
let fileList;

function getSize() {
    const files = fs.readdirSync(dir)
    directorySize = files.length;
    fileList = files;
}

export function generateNumber() {

    setTimeout(() => {

    return Math.floor(Math.random() * 10000000);
    }, 1000)
}

export function generateImageSource(data) {
    setTimeout(() => {

        getSize();

        if (typeof (data) == "number" && !isNaN(data)) {
            let value = data;
            value = value % directorySize;
            let selection = String('/src/assets/img/' + fileList[value]);
            console.log(selection)
            if (selection !== undefined) {
                const filePath = path.relative(filepath, selection);
                fs.writeFile(filepath, selection, err => {
                    if (err) {
                        console.error(err);
                        return
                    } else {
                        let placeholder;
                    }
                });
            }
        }
    })
}

export function readFile() {
    return fs.readFileSync(filepath).toString()
}

