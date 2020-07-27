import React, {useRef, useEffect} from 'react';
import {Stage, Layer, Image} from 'react-konva';
const Caman = window.Caman;

const Editor = ({label}) => {
  const canvasRef = useRef();

  const img = new window.Image();


  useEffect(() => {
    if (!canvasRef.current) {return;}
    const canvas = canvasRef.current.canvas._canvas;
    Caman(canvas, img, function() {
      this.vintage().render();
    });
  })

  if (!label) {return '';}
  img.src = label;

  return (
    <div className='Editor'>
      <Stage width={window.innerWidth} height={700}>
      <Layer ref={canvasRef}>
        <Image
          x={0}
          y={0}
          image={img}
        />
      </Layer>
      </Stage>
    </div>
  );
}

export default Editor;