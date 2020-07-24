import React, {Fragment, useState} from 'react';
import ImageShapes from './ImageShapes';

const UploadPhoto = () => {
  const [imageSrc, setImageSrc] = useState('');

  const onChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {return;}
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => setImageSrc(reader.result));
  };
  
  return (
    <Fragment>
      <ImageShapes image={imageSrc}/>
      <div className="UploadPhoto">
        <h3>Upload Photo</h3>
        <div className="UploadPhoto__photo">
          {imageSrc ? <img src={imageSrc} alt='uploaded' /> : 'No Image'}
        </div>
        <div className="UploadPhoto__buttons">
          <input type='file' onChange={onChange}/>
        </div>
      </div>
    </Fragment>
  );
}

export default UploadPhoto;