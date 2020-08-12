import React, {useRef, useEffect, useState} from 'react';
import {Stage, Layer, Image, Group} from 'react-konva';
import uniqid from 'uniqid';
import EditorControls from './EditorControls';
import DraggableImage from './DraggableImage';
import DraggableText from './DraggableText';
import DrawShapes from './../helpers/DrawShapes';
const caman = window.Caman;

const Editor = ({label, shape}) => {
  const [stageDimensions, setStageDimensions] = useState({width: 0, height: 0});
  const [mainImage, setMainImage] = useState(label);
  const [images, setImages] = useState([]);
  const [selectedElement, selectElement] = useState(null);
  const [text, setText] = useState({
    x: 0,
    y: 0,
    text: '',
    fontSize: 30,
    fill: '#000000',
    fontFamily: 'liana',
    fontStyle: 'normal',
    textDecoration: ''
  });

  const stageRef = useRef();
  const getDimensions = useRef();

  const checkSize = () => {
    const dimensions = getDimensions.current;
    setStageDimensions({
      width: dimensions.offsetWidth,
      height: dimensions.offsetHeight
    }); 
    setText({
      ...text,
      x: dimensions.offsetWidth / 2,
      y: dimensions.offsetHeight / 2
    });
  }

  const clipGroup = ctx => {
    const width = stageDimensions.width;
    const height = stageDimensions.height;
    ctx.save();
    if (shape === 'crest') {
      DrawShapes.crest(ctx, width, height);
    } else if (shape === 'diamond') {
      DrawShapes.diamond(ctx, width, height);
    } else if (shape === 'circle') {
      DrawShapes.circle(ctx, width, height);
    } else {
      DrawShapes.roundedRect(ctx, width, height);
    }
    ctx.clip();
  }

  const filterSelect = filter => {
    if (!filter) {return setMainImage(label);}
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
      x: (stageDimensions.width / 2) - (image.width / 2),
      y: (stageDimensions.height / 2) - (image.height / 2),
      width: image.width,
      height: image.height,
      id: uniqid(),
    }]);
  }

  const checkDeselect = e => e.target.attrs.id === 'mainImage' && selectElement(null);

  useEffect(() => {
    if (getDimensions.current.offsetWidth === stageDimensions.width) {return;}
    checkSize();
  });

  return (
    <div className='Editor'>
      <div className="StageWrapper">
        <img src={label.src} alt='get stage dimensions'  ref={getDimensions} className='getStageDimensions'/>
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
            <Group clipFunc={ctx => clipGroup(ctx)}>
              {images.map((image, i) => (
                <DraggableImage
                  key={i}
                  imageProps={image}
                  isSelected={image.id === selectedElement}
                  onSelect={() => selectElement(image.id)}
                  onChange={newAttrs => {
                    const imgs = images.slice();
                    imgs[i] = newAttrs;
                    setImages(imgs);
                  }}
                />
              ))}
              {text.text.length > 0 && (
                <DraggableText
                  textProps={text}
                  isSelected={selectedElement === 'text'}
                  onSelect={() => selectElement('text')}
                  onChange={newAttrs => setText(newAttrs)}
                />
              )}
            </Group>
          </Layer>
        </Stage>
      </div>
      <EditorControls
        text={text}
        onFilterSelect={filterSelect}
        onIconSelect={iconSelect}
        onTextChange={value => setText({...text, text: value})}
        textColorChange={fill => setText({...text, fill})}
        textFontChange={fontFamily => setText({...text, fontFamily})}
        textStyleChange={fontStyle => setText({...text, fontStyle})}
        textUnderline={() => (
          text.textDecoration === '' ? 
          setText({...text, textDecoration: 'underline'}) : 
          setText({...text, textDecoration: ''})
        )}
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