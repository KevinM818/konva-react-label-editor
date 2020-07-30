import React, {Fragment} from 'react';

const UploadPhoto = ({image, setImg}) => {

  const onChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {return;}
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => setImg(reader.result));
  };
  
  return (
    <Fragment>
      <div className="UploadPhoto">
        <h3>Upload Photo</h3>
        <div className="UploadPhoto__photo">
          {image ? <img src={image} alt='uploaded' /> : 'No Image'}
        </div>
        <div className="UploadPhoto__buttons">
          <input type='file' onChange={onChange}/>
        </div>
      </div>
    </Fragment>
  );
}

export default UploadPhoto;