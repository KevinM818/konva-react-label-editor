import React, {useState} from 'react';
import UploadPhoto from './components/UploadPhoto';
import ImageShapes from './components/ImageShapes';
import Editor from './components/Editor';

const App = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [labelImage, setLabelImage] = useState('');
  
  return (
    <div className="App">
      <h1>Editor Test</h1>
      {
        activeStep === 1 ? 
          <UploadPhoto 
            image={labelImage}
            setImg={imgSrc => {
              setLabelImage(imgSrc);
              setActiveStep(2);
            }}
          /> :
        activeStep === 2 ?
          <ImageShapes
            image={labelImage}
            onLabelSelect={imgSrc => {
              setLabelImage(imgSrc);
              setActiveStep(3);
            }}
          /> :
        activeStep === 3 ?
          <Editor
            label={labelImage}
          /> : ''
      }
    </div>
  );
}

export default App;