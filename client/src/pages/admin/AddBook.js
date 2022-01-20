import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='readwell';
const REGION ='ca-central-1';


AWS.config.update({
    accessKeyId: 'AKIAXJR27NJ66LXTY6EN',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const AddBook = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div>
        <div><h5>Add Book</h5></div>
        <div> Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput} required  accept="image/*" />
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default AddBook;