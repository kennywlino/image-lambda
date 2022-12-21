# LAB - CLASS 17

## Project: AWS S3 and Lambda

## Author: Kenny W. Lino

## Problem Domain

In this lab, we set up an AWS Lambda function to trigger an event when we add a new image file to our AWS S3 bucket. When the lambda is triggered, we read information about the image file and save it to a separate file 'image.json' for later retrieval.

### Links and Resources

- [images.json](https://kenny-d49-demo.s3.us-west-2.amazonaws.com/images.json)

## Deployment Process

To set up the Lambda, we need to write a function in JavaScript (or another language of our choice). This is attached here in [handleImages.json](./handleImages.js).

Using the event information that is passed into our lambda, we can extract the new image filename and use a GET request to retrieve the 'Content Type' and 'Content Length' properties.

We also need to set up a trigger in the AWS Lambda GUI, where we select S3, and add a suffix rule to trigger our lambda **only** when the file is a .jpg file. Otherwise, the lambda would be set to trigger on *every* file upload including our images.json causing an infinite loop.

## Deployment Challenges

Perhaps the most challenging part during deployment was getting all of the variables correct. Although we have tests available in the platform, I think I found it somewhat challenging to integrate into my work so I went the manual route and constantly uploaded/deleted an image to test my code. That ended up being tedious but allowed me to troubleshoot.

The other challenging part was figuring out where to find the 'Content Type' attribute. Although we could find the 'Content Length' property in the image object attached on the event, it seems like we had to do another GET request to get this attribute. I attribute this find to Julien, who shared his insight.