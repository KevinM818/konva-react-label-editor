import React, {useState, useRef, useEffect} from 'react';

const imageShapes = [
  {shapeForm: 'vertRect', title: '3x4 Rounded Corner', width: 820, height: 860},
  {shapeForm: 'crest', title: '4.5 x 3.4 Crest', width: 817, height: 857},
  {shapeForm: 'rect', title: '4x3 Rounded Corner', width: 860, height: 820},
  {shapeForm: 'circle', title: '3.5 x 3.5 Circle', width: 817, height: 817},
  {shapeForm: 'diamond', title: '3.75 x 4.75 Diamond', width: 825, height: 857},
];

const ImageShapes = ({image}) => {
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

    } else if (shape.shapeForm === 'diamond') {
      
    } else if (shape.shapeForm === 'circle') {
      ctx.arc(shape.width / 2, shape.height / 2, shape.width / 2, 0, 2 * Math.PI);
    } else {
      const halfRadians = (2 * Math.PI)/2
      const quarterRadians = (2 * Math.PI)/4  
      const rounded = 10;
      ctx.arc(rounded, rounded, rounded, -quarterRadians, halfRadians, true);
      ctx.lineTo(0, shape.height - rounded);
      ctx.arc(rounded, shape.height - rounded, rounded, halfRadians, quarterRadians, true);
      ctx.lineTo(shape.width - rounded, shape.height);
      ctx.arc(shape.width - rounded, shape.height - rounded, rounded, quarterRadians, 0, true);
      ctx.lineTo(shape.width, rounded);
      ctx.arc(shape.width - rounded, rounded, rounded, 0, -quarterRadians, true);
      ctx.lineTo(rounded, 0);
    }
    ctx.clip();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const scale = Math.max(shape.width / width, shape.height / height);
      const x = (shape.width / 2) - (width / 2) * scale;
      const y = (shape.height / 2) - (height / 2) * scale;
      ctx.drawImage(img, x, y, width * scale, height * scale);
      ctx.restore();
    };
  }));

  if (!image) {return '';}

  return (
    <div className='ImageShapes'>
      <h3>Choose Shape</h3>
      {imageShapes.map((shape, index) => (
        <div className='ImageShapes__shapeWrap' key={shape.shapeForm}>
          <div className='ImageShapes__shape'>
            <canvas width={shape.width} height={shape.height} ref={refs.current[index]}/>
          </div>
          <div className='ImageShapes__shapeInfo'>
            <h3>{shape.title}</h3>
            <button onClick={() => selectedShape(shape.shapeForm)}>
              {selectedShape === shape.shapeForm ? 'selected' : 'select'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageShapes;