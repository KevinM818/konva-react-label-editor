import React, {useRef, useEffect, useState, useReducer} from 'react';
import {Stage, Layer, Image} from 'react-konva';
import uniqid from 'uniqid';
import EditorControls from './EditorControls';
import DraggableImages from './DraggableImage';
import useEvent from './../helpers/useEvent';
// import DrawShapes from './../helpers/DrawShapes';
const caman = window.Caman;

const Editor = ({label}) => {
  const [stageDimensions, setStageDimensions] = useState({width: 0, height: 0});
  const [images, setImages] = useState([]);
  const [selectedImage, selectImage] = useState();

  const stageRef = useRef();
  const getDimensions = useRef();
  const mainLayer = useRef();

  const checkSize = () => setStageDimensions({
    width: getDimensions.current.offsetWidth,
    height: getDimensions.current.offsetHeight
  });
  

  const filterSelect = filter => {
    // caman(canvasRef.current, label, function() {
    //   this.revert();
    //   if (!filter) {return;}
    //   this[filter]().render();
    // })
  }

  const iconSelect = icon => {
    const image = new window.Image();
    image.src = icon;
    image.onload = () => setImages([...images, {x: 30, y: 30, id: uniqid(), image}]);
  }

  const checkDeselect = e => {
    console.log(e.target);
  }

  useEffect(() => {
    if (getDimensions.current.offsetWidth === stageDimensions.width) {return;}
    checkSize();
  });

  return (
    <div className='Editor'>
      <div className="StageWrapper">
        <img src={label.src} alt='hidden to get stage dimensions'  ref={getDimensions} className='getStageDimensions' />
        <Stage 
          width={stageDimensions.width}
          height={stageDimensions.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={stageRef}
        >
          <Layer ref={mainLayer}>
            <Image
              x={0}
              y={0}
              width={stageDimensions.width}
              height={stageDimensions.height}
              image={label}
              id='mainImage'
            />
          </Layer>
          <Layer>
            {images.map((image, i) => (
              <DraggableImages
                key={i}
                imageProps={image}
                isSelected={image.id === selectedImage}
                onSelect={() => selectImage(image.id)}

              />
            ))}
          </Layer>
        </Stage>
      </div>
      <EditorControls
        onFilterSelect={filterSelect}
        onIconSelect={iconSelect}
      />
      <button
        onClick={() => {
          const link = document.createElement('a');
          link.download = 'test-label.png';
          link.href = stageRef.current.getStage().toDataURL({pixelRatio: 3});
          link.click();
          link.remove();
        }}
      >
        SAVE
      </button>
    </div>
  );
}

export default Editor;