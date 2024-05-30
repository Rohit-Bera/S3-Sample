const { S3Client, GetObjectCommand, PutObjectCommand ,ListObjectsV2Command , DeleteObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require("dotenv").config();

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials:{
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.SECRETACCESSKEY
    }
})
console.log('✌️s3Client --->', s3Client);

// to get aws-s3 img link
const getObjectUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: 'nodejs-learning',
        Key: key
    })

    const url = await getSignedUrl(s3Client , command);

    return url;
}

const putObject = async(fileName , contentType) => {
    const command = new PutObjectCommand({
        Bucket: 'nodejs-learning',
        Key: `/${fileName}`,
        ContentType: contentType
    })

    const url = await getSignedUrl(s3Client , command);
    return url;
}

const listObjects = async() => {
    const command = new ListObjectsV2Command({
        Bucket: 'nodejs-learning',
    });

    const list = await s3Client.send(command);
console.log('✌️list --->', list);
}

const deleteObject = async() => {
    const command = new DeleteObjectCommand({
        Bucket: 'nodejs-learning',
        Key: 'AWS_Resources_types.png'
    })

    const deleted = await s3Client.send(command)
    console.log('✌️deleted --->', deleted);
}

(async () => {

    // const getS3ImageUrl = await getObjectUrl('AWS_Resources_types.png')
    // const getS3ImageUrl = await getObjectUrl('/uploads/user-uploads/image-1716372875567.jpeg')

    // console.log('✌️getS3ImageUrl --->', getS3ImageUrl);

    const putImgUrl = await putObject(`image-${Date.now()}.jpeg`,"image/jpeg")
    // const putImgUrl = await putObject(`video-${Date.now()}.mp4`,"video/mp4")

    console.log('✌️putImgUrl --->', putImgUrl)

    // listObjects()

    // deleteObject();
})();
