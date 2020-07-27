import React, {Fragment, useState} from 'react';
import ImageShapes from './ImageShapes';
import Editor from './Editor';

const UploadPhoto = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [selectedLabel, setSelectedLabel] = useState();

  const onChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {return;}
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => setImageSrc(reader.result));
  };
  
  return (
    <Fragment>
      <Editor label={selectedLabel}/>
      <ImageShapes image={imageSrc} onLabelSelect={(src) => setSelectedLabel(src)}/>
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