import React, {useState, useRef, useEffect} from 'react';
import DrawShapes from './../helpers/DrawShapes';

const imageShapes = [
  {shapeForm: 'vertRect', title: '3x4 Rounded Corner', width: 900, height: 1200},
  {shapeForm: 'crest', title: '4.5 x 3.4 Crest', width: 1350, height: 1050},
  {shapeForm: 'rect', title: '4x3 Rounded Corner', width: 1200, height: 900},
  {shapeForm: 'circle', title: '3.5 x 3.5 Circle', width: 1050, height: 1050},
  {shapeForm: 'diamond', title: '3.75 x 4.75 Diamond', width: 1125, height: 1425},
];

const ImageShapes = ({image, onLabelSelect}) => {
  const [selectedShape, selectShape] = useState('');
  const refs = useRef(imageShapes.map(i => React.createRef()));

  useEffect(() => refs.current.forEach((ref, index) => {
    if (!ref.current) {return;}
    const ctx = ref.current.getContext('2d');
    const shape = imageShapes[index];
    const img = new Image();
    img.src = image;
    ctx.save();
    if (shape.shapeForm === 'crest') {
      DrawShapes.crest(ctx, shape.width, shape.height);
    } else if (shape.shapeForm === 'diamond') {
      DrawShapes.diamond(ctx, shape.width, shape.height);
    } else if (shape.shapeForm === 'circle') {
      DrawShapes.circle(ctx, shape.width, shape.height);
    } else {
      DrawShapes.roundedRect(ctx, shape.width, shape.height);
    }
    ctx.clip();
    img.onload = () => DrawShapes.drawImage(ctx, img, shape.width, shape.height);
  }));

  return (
    <div className='ImageShapes'>
      {imageShapes.map((shape, index) => (
        <div className='ImageShapes__shapeWrap' key={shape.shapeForm}>
          <div className='ImageShapes__shape'>
            <canvas width={shape.width} height={shape.height} ref={refs.current[index]}/>
          </div>
          <div className='ImageShapes__shapeInfo'>
            <h3>{shape.title}</h3>
            <button onClick={() => {
              selectShape(shape.shapeForm);
              const canvas = refs.current[index].current;
              const src = canvas.toDataURL();
              const img = new Image();
              img.src = src;
              img.onload = () => onLabelSelect(img, shape.shapeForm);
            }}>
              {selectedShape === shape.shapeForm ? 'selected' : 'select'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageShapes;