const { S3 } = require("aws-sdk");

const s3 = new S3();

exports.handler = async (event) => {
    
    const bucketName = event.Records[0].s3.bucket.name;
    const newImage = event.Records[0].s3.object;

    let imageData;
    
    // getting data from S3 if it exists;
    // setting it up if not
    try {
        const data = await s3.getObject({
            Bucket: bucketName,
            Key: 'images.json',
        }).promise();
        imageData = JSON.parse(data.Body.toString());
    } catch(e) {
        imageData = [];
    }
    
    // getting the image from the Bucket
    // could get most info from "event" but cannot find ContentType
    
    let newImageFiltered = {};
    
    try {
        const img = await s3.getObject({
            Bucket: bucketName,
            Key: newImage.key,
        }).promise();
        
        newImageFiltered = {
            key: newImage.key,
            size: img.ContentLength,
            type: img.ContentType,
        }
    } catch(e) {
        console.log(e);
        console.error('ERROR: Cannot retrieve image from S3 Bucket.')
    }
    
    // adding image info to imageData
    let imageIdx = imageData.findIndex(element => element.key === newImageFiltered.key); 
    
    // if there is no matching index
    if (imageIdx === -1) {
        imageData.push(newImageFiltered);
    } else {
        imageData[imageIdx] = newImageFiltered;
    }

    try {
        let storeImageData = await s3.putObject({
            Bucket: bucketName,
            Key: 'images.json',
            Body: JSON.stringify(imageData),
        }).promise();
        console.log("SUCCESS: Image data saved to S3 Bucket.");
    } catch(e) {
        console.error(e);
        console.log("ERROR: Cannot upload item to S3 Bucket.");
    }
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Image data stored in kenny-d49-demo bucket'),
    };
    return response;
};
