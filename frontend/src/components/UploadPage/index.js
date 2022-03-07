import { useState, useEffect } from 'react';
import AWS from 'aws-sdk'
import './style/upload-page.css';

export const UploadPage = () => {
    const S3_BUCKET = process.env.REACT_APP_BUCKET;
    const REGION = process.env.REACT_APP_REGION;

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS
    });

    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    })

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!title) errors.push('Please provide a value for Song Title.')
    if (!imgUrl) errors.push('Please provide a value for Cover Art URL.')
  }, [title, imgUrl]);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
    if (file) {
      if (file.type === "audio/mpeg") {
        const params = {
          Body: file,
          Bucket: S3_BUCKET,
          Key: file.name
        };
        myBucket.upload(params)
          .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err, data) => {
            if (err) return console.log(err);
            if (data) {
              const { Location, key } = data;
              const song = {
                url: Location,
                awsKey: key
              }
              console.log(song);
              setProgress(0);
              setSelectedFile(null);
            }
          })
        return;
      }
    }
    alert('File type not supported')
    return;
  }


  return (
    <div className='upload-page-container'>
      <div> Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <label htmlFor="title">Song Title</label>
      <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
      <label htmlFor="imgUrl">Cover Art URL</label>
      <input type="text"name="imgUrl" onChange={(e) => setImgUrl(e.target.value)}></input>
      <button onClick={() => uploadFile(selectedFile)}> Upload Song</button>
    </div>
  )

};
