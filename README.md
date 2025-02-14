<style>
* {
    background-color: #f9a7c0;
    color: white;
    font-family: "Yu Gothic";
}

pre {
    color:beige;
    font-family: Arial;
}

h1 {
    text-align: center;
}

h1,h2,h3,h4,h5 {
    color: #f0e9f0;
    font-family: "Times New Roman";
}

</style>

# flashbulb

### Application for retrieving a random image from a list of images

Data is stored in an s3 bucket that is queried to obtain, delete, or store images.
There is a prexisting bucket that is hardcoded into the application, though you may replace that if you wish,
otherwise, you may contact me for the access keys at abrahamp@oregonstate.edu or via discord #daughterOfSpring.

## To Run
add access credentials to config.json 

npm install

npm start

## Endpoints

Responses are all the JSON component of the response body.

**GET** /image/list </br>
Gets a list of all the filenames in the s3 bucket.
##### example -
<pre> Request - fetch('localhost:3001/image/list');
 Response - {"files": ["filename.jpg", "otherFile.jpg", "thirdOne.jpg"]}
</pre>

**GET** /image/random </br>
Retrieves a random image from the s3 bucket.
##### example -
<pre> Request - fetch('localhost:3001/image/random');
 Response - {"url": "file/location/inS3/filename.jpg" }
</pre>

**GET** /image/*{fileName}* </br>
Retrieves a specific image from the s3 bucket.
##### example -
<pre> Request - fetch('localhost:3001/image/fileName.jpg');
 Response - {"url": "file/location/inS3/filename.jpg" }
</pre>

**DELETE** /image/*{fileName}* </br>
Deletes an image from the s3 bucket.
##### example -
<pre> Request - fetch('localhost:3001/image/fileName.jpg', {method: "DELETE"});
 Response - {"message": "File deleted successfully"}
</pre>

**POST** /image/upload +++
***BODY*** - multipart/form-data - file object to be uploaded </br>
Stores a new image in the s3 bucket.
##### example -
<pre> Request - fetch('localhost:3001/image/upload', {method: "POST", body: formData});
 Response - {"message": "File uploaded successfully: file/location/inS3/filename.jpg" }
</pre>

# UML sequence diagram showing how requesting and receiving data works. Make it detailed enough that your teammate (and your grader) will understand.