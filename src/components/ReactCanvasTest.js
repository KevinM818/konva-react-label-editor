import React from 'react';
// import {Surface, Layer, Image} from 'react-canvas';
import ReactCanvas from 'react-canvas';

var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;
var Layer = ReactCanvas.Layer;

const ReactCanvasTest = ({image}) => {
  if (!image) {return;}

  const imageStyle = {
    top: 0,
    left: 0,
    width: 560,
    height: 700
  }

  return (
    <div className='ReactCanvasTest'>
      <Surface width={560} height={700}>
        <Layer>
          <Image style={imageStyle} src={image} />
        </Layer>
      </Surface>
    </div>
  );
};

export default ReactCanvasTest;