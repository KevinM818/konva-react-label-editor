import React, {useRef, useEffect, useState} from 'react';
import {Stage, Layer, Image} from 'react-konva';
import uniqid from 'uniqid';
import EditorControls from './EditorControls';
import DraggableImages from './DraggableImage';
import DrawShapes from './../helpers/DrawShapes';
const caman = window.Caman;

const Editor = ({label}) => {
  const [mainImage, setMainImage] = useState(label);
  const [stageDimensions, setStageDimensions] = useState({width: 0, height: 0});
  const [images, setImages] = useState([]);
  const [selectedImage, selectImage] = useState();

  const stageRef = useRef();
  const getDimensions = useRef();

  const checkSize = () => setStageDimensions({
    width: getDimensions.current.offsetWidth,
    height: getDimensions.current.offsetHeight
  });

  const filterSelect = filter => {
    const canvas = document.createElement('canvas');
    canvas.width = label.width;
    canvas.height = label.height;
    const ctx = canvas.getContext('2d');
    DrawShapes.drawImageToFit(ctx, label, label.width, label.height);
    caman(canvas, label, function(){
      this[filter]().render(() => {
        const img = new window.Image();
        img.src = canvas.toDataURL();
        img.onload = () => {
          setMainImage(img);
          canvas.remove();
        }
      });
    });
  }

  const iconSelect = icon => {
    const image = new window.Image();
    image.src = icon;
    image.onload = () => setImages([...images, {
      image,
      x: 30,
      y: 30,
      width: image.width,
      height: image.height,
      id: uniqid(),
    }]);
  }

  const checkDeselect = e => e.target.attrs.id === 'mainImage' ? selectImage(null) : ''

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
          <Layer>
            <Image
              x={0}
              y={0}
              width={stageDimensions.width}
              height={stageDimensions.height}
              image={mainImage}
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
                onChange={newAttrs => {
                  const imgs = images.slice();
                  imgs[i] = newAttrs;
                  setImages(imgs);
                }}
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