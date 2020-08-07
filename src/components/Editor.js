import React, {useRef, useEffect} from 'react';
import {fabric} from 'fabric';
import EditorControls from './EditorControls';
import DrawShapes from './../helpers/DrawShapes';

const caman = window.Caman;
let canvas;
let mainCanvas;

const Editor = ({label}) => {
  const canvasRef = useRef();

  const filterSelect = filter => {
    caman(mainCanvas, label, function() {
      this.revert();
      if (!filter) {return;}
      this[filter]().render();
    })
  }

  const iconSelect = icon => {
    const img = new Image();
    img.src = icon;
    img.onload = () => {
      const image = new fabric.Image(img, {left: 30, top: 30});
      canvas.add(image);
    }
  }

  // const saveLabel = () => {
  //   const mainCanvas = canvasRef.current;
  //   const mainCtx = mainCanvas.getContext('2d');
  //   const iconLayerCanvas = iconCanvasRef.current;
  //   mainCtx.drawImage(iconLayerCanvas, 0, 0);
  //   const mainImage = mainCanvas.toDataURL();
  //   const link = document.createElement('a');
  //   link.download = 'test-label.png';
  //   link.href = mainImage;
  //   link.click();
  // }

  useEffect(() => {
    canvas = new fabric.Canvas('fabricCanvas', {width: label.width, height: label.height});
    canvas.setDimensions({width: '100%', height: 'auto'}, {backstoreOnly: false, cssOnly: true});
    mainCanvas = document.createElement('canvas');
    mainCanvas.width = label.width;
    mainCanvas.height = label.height;
    const ctx = mainCanvas.getContext('2d');
    DrawShapes.drawImageToFit(ctx, label, label.width, label.height);
    document.querySelector('.canvas-container').prepend(mainCanvas);
  });


  return (
    <div className='Editor'>
      <div className="Editor__canvasLayers">
        <canvas id="fabricCanvas"/>
      </div>
      <EditorControls
        onFilterSelect={filterSelect}
        onIconSelect={iconSelect}
      />
    </div>
  );
}

export default Editor;